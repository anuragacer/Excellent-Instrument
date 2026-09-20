import os
import re
from bs4 import BeautifulSoup

BASE_DIR = "d:/Exservices"
html_files = [f for f in os.listdir(BASE_DIR) if f.endswith(".html")]

print(f"Verifying {len(html_files)} HTML pages in {BASE_DIR}...")
all_passed = True
total_links_checked = 0

for hf in html_files:
    path = os.path.join(BASE_DIR, hf)
    with open(path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "html.parser")
    
    # Check images
    for img in soup.find_all("img"):
        src = img.get("src", "").split("?")[0].split("#")[0]
        if src and not src.startswith("http") and not src.startswith("data:"):
            total_links_checked += 1
            full_path = os.path.join(BASE_DIR, src.replace("/", os.sep))
            if not os.path.exists(full_path):
                print(f"❌ Missing Image in {hf}: {src}")
                all_passed = False

    # Check local links
    for a in soup.find_all("a"):
        href = a.get("href", "").split("?")[0].split("#")[0]
        if href and not href.startswith("http") and not href.startswith("mailto:") and not href.startswith("tel:") and not href.startswith("#"):
            total_links_checked += 1
            full_path = os.path.join(BASE_DIR, href.replace("/", os.sep))
            if not os.path.exists(full_path):
                print(f"❌ Broken Link in {hf}: {href}")
                all_passed = False

if all_passed:
    print(f"[OK] PERFECT! All {total_links_checked} internal asset paths, images, and links exist and are valid.")
else:
    print("[WARNING] Some asset links need fixing.")
