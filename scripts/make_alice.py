# Builds src/lib/alice.js: Alice's Adventures in Wonderland (Lewis Carroll, 1865; public domain), chapters I–III,
# from Project Gutenberg eBook #11 (research/raw/pg11-alice.txt), lower-cased and split into words and punctuation.
import re, json
L = open('research/raw/pg11-alice.txt', encoding='utf-8').read().split('\n')
s = [i for i, l in enumerate(L) if l.strip() == 'CHAPTER I.'][0]
e = [i for i, l in enumerate(L) if l.strip() == 'CHAPTER IV.'][0]
lines = [l.strip() for l in L[s:e]]
lines = [l for l in lines if not re.match(r'^CHAPTER [IVX]+\.$', l) and l not in ('Down the Rabbit-Hole', 'The Pool of Tears', 'A Caucus-Race and a Long Tale')]
t = ' '.join(lines).replace('_', '')
t = re.sub(r'[\u2018\u2019]', "'", t)
toks = re.findall(r"[a-z]+(?:'[a-z]+)?|[.!?,;]", t.lower())
open('src/lib/alice.js', 'w').write("// Lewis Carroll, Alice's Adventures in Wonderland (1865), chapters I–III. Public domain; text from Project Gutenberg eBook #11.\n// Lower-cased and split into words and punctuation by scripts/make_alice.py.\nexport const ALICE = " + json.dumps(' '.join(toks)) + ";\n")
print(len(toks), 'tokens', len(set(toks)), 'distinct')
