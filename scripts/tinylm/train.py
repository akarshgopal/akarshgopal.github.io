"""Tiny transformer for 'How Machines Learned': trains offline on CPU in a few minutes and writes
src/lib/tinylm.js (attention maps + next-word guesses for a handful of sentences, and a comparison with
n-gram models on held-out text).

Data: Lewis Carroll, *Alice's Adventures in Wonderland* (1865, Project Gutenberg #11) and *Through the
Looking-Glass* (1871, #12), both public domain. Lower-cased and split into words and punctuation exactly as
scripts/make_alice.py does for the in-browser n-gram figure. The last 5% of each book is held out.

Model: decoder-only (causal) transformer, 2 layers x 4 heads, width 64, feed-forward 256, context 48 words,
learned positions, pre-LayerNorm, tied input/output embeddings. Word vocabulary = words seen at least twice in
the training text; the rest become <unk>.

Run:  /workspace/.venv-ml/bin/python scripts/tinylm/train.py      (from the repo root; seed fixed)
"""
import re, json, math, random, time, collections, os
import torch, torch.nn as nn, torch.nn.functional as F

SEED = 7; random.seed(SEED); torch.manual_seed(SEED); torch.set_num_threads(int(os.environ.get('THREADS', 8)))
E = lambda k, d: type(d)(os.environ.get(k, d))  # overrides for the hyper-parameter sweep (scripts/tinylm/README.md)
D, H, L, FF, CTX, DROP = E('D', 64), 4, 2, 4 * E('D', 64), 48, E('DROP', 0.3)
STEPS, BATCH, LR = E('STEPS', 2500), 64, E('LR', 3e-3)

def book(path):
    t = open(path, encoding='utf-8').read()
    t = t[t.index('*** START OF'):]; t = t[t.index('\n') + 1:t.index('*** END OF')]
    lines = [l.strip() for l in t.split('\n')]
    # drop the contents list and chapter headings (lines starting CHAPTER, and the title line after each)
    out, skip = [], 0
    for l in lines:
        if re.match(r'^CHAPTER [IVXL]+\.?', l): skip = 2; continue
        if skip and l: skip -= 1; continue
        out.append(l)
    t = ' '.join(out).replace('_', '')
    t = re.sub(r'[\u2018\u2019]', "'", t)
    return re.findall(r"[a-z]+(?:'[a-z]+)?|[.!?,;]", t.lower())

books = [book('research/raw/pg11-alice.txt'), book('research/raw/pg12-looking-glass.txt')]
train_t, val_t = [], []
for b in books:
    cut = int(len(b) * 0.95); train_t += b[:cut]; val_t += b[cut:]
cnt = collections.Counter(train_t)
itos = ['<unk>'] + sorted(w for w, c in cnt.items() if c >= 2)
stoi = {w: i for i, w in enumerate(itos)}
enc = lambda ws: [stoi.get(w, 0) for w in ws]
tr, va = torch.tensor(enc(train_t)), torch.tensor(enc(val_t))
V = len(itos)
print(f'train {len(tr)} tokens, val {len(va)}, vocab {V}, unk rate val {(va == 0).float().mean():.3f}')

class Block(nn.Module):
    def __init__(s):
        super().__init__(); s.ln1, s.ln2 = nn.LayerNorm(D), nn.LayerNorm(D)
        s.qkv, s.proj = nn.Linear(D, 3 * D), nn.Linear(D, D)
        s.ff = nn.Sequential(nn.Linear(D, FF), nn.GELU(), nn.Linear(FF, D)); s.drop = nn.Dropout(DROP)
    def forward(s, x, keep=None):
        B, T, _ = x.shape
        q, k, v = s.qkv(s.ln1(x)).view(B, T, 3, H, D // H).permute(2, 0, 3, 1, 4)
        a = (q @ k.transpose(-1, -2)) / math.sqrt(D // H)
        a = a.masked_fill(torch.triu(torch.ones(T, T, dtype=torch.bool), 1), float('-inf')).softmax(-1)
        if keep is not None: keep.append(a.detach())
        y = (s.drop(a) @ v).transpose(1, 2).reshape(B, T, D)
        x = x + s.drop(s.proj(y))
        return x + s.drop(s.ff(s.ln2(x)))

class LM(nn.Module):
    def __init__(s):
        super().__init__(); s.emb, s.pos = nn.Embedding(V, D), nn.Embedding(CTX, D)
        s.blocks = nn.ModuleList(Block() for _ in range(L)); s.ln = nn.LayerNorm(D)
    def forward(s, idx, keep=None):
        x = s.emb(idx) + s.pos(torch.arange(idx.shape[1]))
        for b in s.blocks: x = b(x, keep)
        return s.ln(x) @ s.emb.weight.T

m = LM(); NP = sum(p.numel() for p in m.parameters())
print('parameters', NP)
opt = torch.optim.AdamW(m.parameters(), lr=LR, weight_decay=0.1)
sched = torch.optim.lr_scheduler.OneCycleLR(opt, LR, total_steps=STEPS, pct_start=0.05)
def batch(src):
    ix = torch.randint(0, len(src) - CTX - 1, (BATCH,))
    return torch.stack([src[i:i + CTX] for i in ix]), torch.stack([src[i + 1:i + CTX + 1] for i in ix])
@torch.no_grad()
def val_loss(model):
    model.eval(); tot, n = 0.0, 0
    for i in range(0, len(va) - 1, CTX):  # non-overlapping windows, first token of each window has no context
        x, y = va[i:i + CTX], va[i + 1:i + CTX + 1]; x = x[:len(y)]
        tot += F.cross_entropy(model(x[None])[0], y, reduction='sum').item(); n += len(y)
    model.train(); return tot / n
best, best_state, hist, t0 = 9e9, None, [], time.time()
for step in range(1, STEPS + 1):
    x, y = batch(tr); loss = F.cross_entropy(m(x).view(-1, V), y.view(-1))
    opt.zero_grad(); loss.backward(); torch.nn.utils.clip_grad_norm_(m.parameters(), 1.0); opt.step(); sched.step()
    if step % 125 == 0:
        vl = val_loss(m); hist.append([step, round(loss.item(), 3), round(vl, 3)])
        print(f'step {step} train {loss.item():.3f} val {vl:.3f} ({time.time() - t0:.0f}s)')
        if vl < best: best, best_state = vl, {k: v.clone() for k, v in m.state_dict().items()}
m.load_state_dict(best_state); m.eval()
@torch.no_grad()
def train_loss(model):
    tot, n = 0.0, 0
    for i in range(0, min(len(tr), 40000) - 1, CTX):
        x, y = tr[i:i + CTX], tr[i + 1:i + CTX + 1]; x = x[:len(y)]
        tot += F.cross_entropy(model(x[None])[0], y, reduction='sum').item(); n += len(y)
    return tot / n
TL = train_loss(m); print(f'best val {best:.3f} (ppl {math.exp(best):.1f}), train {TL:.3f}')

# ---- n-gram baselines on the same split, interpolated Witten-Bell (unigram add-one at the bottom) ----
TR, VA = enc(train_t), enc(val_t)
uni = collections.Counter(TR); N1 = len(TR)
big, tri = collections.defaultdict(collections.Counter), collections.defaultdict(collections.Counter)
for a, b in zip(TR, TR[1:]): big[a][b] += 1
for a, b, c in zip(TR, TR[1:], TR[2:]): tri[(a, b)][c] += 1
p1 = lambda w: (uni[w] + 1) / (N1 + V)
def wb(table, ctx, w, lower):
    c = table.get(ctx)
    if not c: return lower
    n, t = sum(c.values()), len(c)
    return (c[w] + t * lower) / (n + t)
p2 = lambda a, w: wb(big, a, w, p1(w))
p3 = lambda a, b, w: wb(tri, (a, b), w, p2(b, w))
def ce(f, k):
    s = 0.0; n = 0
    for i in range(k, len(VA)): s -= math.log(f(i)); n += 1
    return s / n
ng = {'unigram': ce(lambda i: p1(VA[i]), 2), 'bigram': ce(lambda i: p2(VA[i - 1], VA[i]), 2), 'trigram': ce(lambda i: p3(VA[i - 2], VA[i - 1], VA[i]), 2)}
print({k: round(math.exp(v), 1) for k, v in ng.items()})

# ---- outputs ----
q8 = lambda v: int(round(v * 255))
def top(probs, k=5, skip_unk=True):
    p, i = probs.sort(descending=True); out = []
    for pi, ii in zip(p.tolist(), i.tolist()):
        if skip_unk and ii == 0: continue
        out.append([itos[ii], round(pi, 3)])
        if len(out) == k: break
    return out
SENTS = [
    "the rabbit took a watch out of its waistcoat pocket , and looked at it",
    "alice opened the door and found that it led into a small passage",
    "the mouse turned round and swam slowly back to her",
    "the queen turned crimson with fury , and shouted off with her head",
    "the cat only grinned when it saw alice",
    "she was close behind it when she turned the corner , but the rabbit was no longer to be seen",
]
sents = []
for s in SENTS:
    ws = s.split(); ids = torch.tensor(enc(ws))
    unk = [w for w in ws if w not in stoi]
    assert not unk, unk
    keep = []
    with torch.no_grad(): logits = m(ids[None], keep)
    P = logits[0].softmax(-1)
    att = [[[[q8(v) for v in keep[l][0, h, i, :i + 1].tolist()] for i in range(len(ws))] for h in range(H)] for l in range(L)]
    sents.append({'words': ws, 'att': att, 'next': [top(P[i], 3) for i in range(len(ws))]})
# Comparison with the word-triple (trigram) model, both scored with the same smoothed probabilities used for
# the perplexities above. Two kinds of prompt: famous phrases from the training text (both models have seen
# them), and passages taken at evenly spaced points from the held-out text (neither has). The held-out
# passages are not hand-picked: every 12th of the eligible positions, where eligible = the true next word is
# a known word and not punctuation, and the 10 words before it contain no <unk>.
def tri_dist(a, b):
    return torch.tensor([p3(a, b, w) for w in range(V)])
def tiny_dist(ids):
    with torch.no_grad(): return m(torch.tensor(ids[-CTX:])[None])[0, -1].softmax(-1)
SEEN = ["the white", "said the", "the mock", "off with her", "alice was beginning to get very"]
cmp = []
for pr in SEEN:
    ids = enc(pr.split()); a, b = ([0] + ids)[-2:]
    cmp.append({'prompt': pr.split(), 'seen': True, 'tiny': top(tiny_dist(ids)), 'ngram': top(tri_dist(a, b))})
elig = [i for i in range(CTX, len(VA)) if VA[i] != 0 and itos[VA[i]] not in '.!?,;' and 0 not in VA[i - 10:i]]
for i in elig[len(elig) // 24::len(elig) // 12][:12]:
    ids = VA[i - CTX + 1:i]; Pt, Pn = tiny_dist(ids), tri_dist(VA[i - 2], VA[i - 1])
    cmp.append({'prompt': [itos[t] for t in VA[i - 10:i]], 'seen': False, 'truth': itos[VA[i]],
                'pTiny': round(Pt[VA[i]].item(), 4), 'pNgram': round(Pn[VA[i]].item(), 4), 'tiny': top(Pt), 'ngram': top(Pn)})
# top-1 accuracy over the whole held-out text, same eligible positions
acc_t = acc_n = 0
for i in elig:
    acc_t += int(tiny_dist(VA[i - CTX + 1:i]).argmax().item() == VA[i]); acc_n += int(tri_dist(VA[i - 2], VA[i - 1]).argmax().item() == VA[i])
acc = {'n': len(elig), 'tiny': round(acc_t / len(elig), 3), 'trigram': round(acc_n / len(elig), 3)}
print('held-out top-1 on known non-punctuation words', acc)
meta = {'params': NP, 'layers': L, 'heads': H, 'width': D, 'ff': FF, 'context': CTX, 'vocab': V, 'trainTokens': len(tr),
        'valTokens': len(va), 'steps': STEPS, 'batch': BATCH, 'seed': SEED, 'valLoss': round(best, 3), 'valPpl': round(math.exp(best), 1),
        'trainLoss': round(TL, 3), 'trainPpl': round(math.exp(TL), 1), 'ngramValPpl': {k: round(math.exp(v), 1) for k, v in ng.items()},
        'unkRateVal': round((va == 0).float().mean().item(), 3), 'history': hist, 'top1': acc,
        'data': "Alice's Adventures in Wonderland (1865) and Through the Looking-Glass (1871), Project Gutenberg #11 and #12; last 5% of each held out"}
js = ('// Generated by scripts/tinylm/train.py: a 2-layer, 4-head transformer trained on two public-domain Lewis Carroll books.\n'
      '// att[layer][head][i][j] = attention of word i on earlier word j, 0–255 (row sums ≈ 255). next[i] = top guesses for word i+1.\n'
      'export const TINYLM = ' + json.dumps({'meta': meta, 'sentences': sents, 'compare': cmp}, separators=(',', ':')) + ';\n')
if os.environ.get('NOWRITE'): print('sweep run, nothing written')
else: open('src/lib/tinylm.js', 'w').write(js); print('wrote src/lib/tinylm.js', len(js), 'bytes')
