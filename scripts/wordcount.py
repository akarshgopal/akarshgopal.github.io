# Word count of a built page: all visible text, and running prose only (<p>/<li> outside <figure>, <aside> and notes).
import re, html, sys
s = open(sys.argv[1] if len(sys.argv) > 1 else 'dist/index.html').read()
s = re.sub(r'<(script|style)[\s\S]*?</\1>', '', s)
w = lambda t: len(html.unescape(re.sub(r'<[^>]+>', ' ', t)).split())
allw = w(s)
body = re.sub(r'<figure[\s\S]*?</figure>', '', s)
notes = re.search(r'<(section|ol)[^>]*id="notes"[\s\S]*', body); body = body[:notes.start()] if notes else body
prose = sum(w(m) for m in re.findall(r'<(?:p|li)\b[\s\S]*?</(?:p|li)>', body))
print(f'all visible: {allw}  prose: {prose}')
