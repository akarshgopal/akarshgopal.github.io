# Tiny transformer (used in the main essay §11 and Learning §9)

`train.py` trains, on CPU, the small language model whose attention maps and guesses the site shows, and writes
`src/lib/tinylm.js` (≈24 KB). Run from the repo root:

    /workspace/.venv-ml/bin/python scripts/tinylm/train.py     # PyTorch 2.x, CPU; ~3 min on 8 cores; seed 7

**Data.** Lewis Carroll, *Alice's Adventures in Wonderland* (1865) and *Through the Looking-Glass* (1871),
Project Gutenberg #11 and #12 (public domain; `research/raw/pg11-alice.txt`, `pg12-looking-glass.txt`).
Gutenberg header/footer and chapter headings removed; lower-cased; tokens are words and `. ! ? , ;`
(same regex as `scripts/make_alice.py`). Last 5% of each book held out: 62,040 training tokens, 3,266 held-out.
Vocabulary = training words seen ≥2 times (2,318); everything else is `<unk>` (7.0% of held-out tokens).

**Model.** Decoder-only (causal) transformer: 2 layers × 4 heads, width 64, feed-forward 256, context 48,
learned positions, pre-LayerNorm, GELU, tied input/output embeddings, dropout 0.3. 251,520 parameters.
AdamW (lr 3e-3 one-cycle, weight decay 0.1), batch 64 × 48 tokens, 2,500 steps; the checkpoint with the best
held-out loss (evaluated every 125 steps) is kept.

**Results (held-out text).**

| model | cross-entropy (nats/token) | perplexity | top-1 on 1,336 known non-punctuation words |
|---|---|---|---|
| tiny transformer | 4.548 | 94.4 | 16.3% |
| Witten–Bell bigram | | 104.6 | |
| Witten–Bell trigram | | 110.7 | 16.8% |
| add-one unigram | | 244.6 | |

Training loss of the kept checkpoint: 3.991 (perplexity 54), so it overfits; more data would help more than size.

**Honesty notes.** Width and dropout were chosen from a small sweep scored on the same held-out text
(D=64/drop 0.3 → 94.4; D=96 → 95.3; D=128 → 94.5; drop 0.2 → 99.6), so the held-out numbers are slightly
optimistic; there is no separate test set. The `<unk>` token is skipped when listing guesses. Attention values are
quantised to 0–255. The "from the books" prompts occur in the training text; the held-out prompts are every
12th eligible position of the held-out text, not hand-picked. The six attention sentences are from or close to the
books (some are lightly paraphrased) and so are partly training text.
