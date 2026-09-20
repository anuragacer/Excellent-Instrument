import os
import re
from bs4 import BeautifulSoup

path = 'C:/Users/Administrator/.gemini/antigravity/brain/1a412906-96be-444c-b661-2ca4c1d6b410/scratch/home_raw.html'
with open(path, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

print("--- Testimonials ---")
for el in soup.find_all(class_=re.compile(r'testimonial', re.I)):
    txt = el.get_text(strip=True)
    if len(txt) > 20:
        print("T:", txt[:200])

print("\n--- Sections found in homepage ---")
for sec in soup.find_all('section'):
    cls = sec.get('class', [])
    h = sec.find(['h1', 'h2', 'h3'])
    h_text = h.get_text(strip=True) if h else "No heading"
    print(f"Sec {cls}: {h_text}")
