import os
import re
import json
import urllib3
import requests
from urllib.parse import urljoin, unquote

urllib3.disable_warnings()

BASE_DIR = os.path.abspath("d:/Exservices")
ASSETS_DIR = os.path.join(BASE_DIR, "assets")
IMG_DIR = os.path.join(ASSETS_DIR, "images")
DOCS_DIR = os.path.join(ASSETS_DIR, "docs")

for d in [
    os.path.join(IMG_DIR, "clients"),
    os.path.join(IMG_DIR, "equipment"),
    os.path.join(IMG_DIR, "banners"),
    os.path.join(IMG_DIR, "certificates"),
    os.path.join(IMG_DIR, "services"),
    os.path.join(IMG_DIR, "misc"),
    DOCS_DIR,
]:
    os.makedirs(d, exist_ok=True)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9'
}

BASE_URL = 'https://www.excellentservices.co.in/'

visited_urls = set()
to_visit = [BASE_URL]
downloaded_assets = {}
all_pages_data = {}

def sanitize_filename(name):
    clean = re.sub(r'[\\/*?:"<>| ]', '_', unquote(name)).strip('_')
    return clean if clean else "file"

def download_file(url, dest_folder):
    try:
        filename = sanitize_filename(url.split('/')[-1])
        if not filename or '.' not in filename:
            filename = f"asset_{abs(hash(url))}.jpg"
        dest_path = os.path.join(dest_folder, filename)
        
        if os.path.exists(dest_path) and os.path.getsize(dest_path) > 0:
            return dest_path
        
        r = requests.get(url, headers=HEADERS, verify=False, timeout=20)
        if r.status_code == 200 and len(r.content) > 100:
            with open(dest_path, 'wb') as f:
                f.write(r.content)
            return dest_path
        else:
            print(f"Failed download {url} (status {r.status_code})")
    except Exception as e:
        print(f"Error downloading {url}: {e}")
    return None

print("Step 1: Crawling website and collecting all pages, images, and documents...")

while to_visit and len(visited_urls) < 40:
    url = to_visit.pop(0)
    if url in visited_urls:
        continue
    visited_urls.add(url)
    
    try:
        res = requests.get(url, headers=HEADERS, verify=False, timeout=12)
        if res.status_code != 200:
            continue
        html = res.text
        
        title_match = re.search(r'<title>(.*?)</title>', html, re.I)
        page_title = title_match.group(1).strip() if title_match else url
        
        # Save page textual content info
        all_pages_data[url] = {
            "title": page_title,
            "url": url,
            "html": html
        }
        
        # Discover images
        for img in re.findall(r'src=["\']([^"\']+\.(?:jpg|jpeg|png|webp|svg))["\']', html, re.I):
            img_url = urljoin(url, img)
            if img_url not in downloaded_assets:
                # determine category
                target_sub = "misc"
                lower = img_url.lower()
                if "clienteleimage" in lower or "client" in lower or "logo" in lower:
                    target_sub = "clients"
                elif "productimage" in lower or "equipment" in lower or "machine" in lower or "gauge" in lower or "tester" in lower:
                    target_sub = "equipment"
                elif "banner" in lower or "slider" in lower:
                    target_sub = "banners"
                elif "award" in lower or "certificate" in lower or "nabl" in lower:
                    target_sub = "certificates"
                elif "service" in lower:
                    target_sub = "services"
                
                saved = download_file(img_url, os.path.join(IMG_DIR, target_sub))
                if saved:
                    downloaded_assets[img_url] = os.path.relpath(saved, BASE_DIR).replace('\\', '/')
        
        # Discover PDFs
        for pdf in re.findall(r'href=["\']([^"\']+\.pdf)["\']', html, re.I):
            pdf_url = urljoin(url, pdf)
            if pdf_url not in downloaded_assets:
                saved = download_file(pdf_url, DOCS_DIR)
                if saved:
                    downloaded_assets[pdf_url] = os.path.relpath(saved, BASE_DIR).replace('\\', '/')
        
        # Discover links
        for link in re.findall(r'href=["\']([^"\']+)["\']', html, re.I):
            if not any(link.lower().endswith(ext) for ext in ('.css', '.js', '.png', '.jpg', '.jpeg', '.pdf', '.ico', '.svg', '.gif')):
                full_link = urljoin(url, link).split('#')[0]
                if 'excellentservices.co.in' in full_link and full_link not in visited_urls and full_link not in to_visit:
                    to_visit.append(full_link)

    except Exception as e:
        print(f"Error crawling {url}: {e}")

# Save manifest of downloaded assets
manifest_path = os.path.join(ASSETS_DIR, "asset_manifest.json")
with open(manifest_path, "w", encoding="utf-8") as f:
    json.dump(downloaded_assets, f, indent=2)

print(f"\nCrawling complete!")
print(f"Downloaded {len(downloaded_assets)} total media assets and documents into {ASSETS_DIR}")
print(f"Manifest written to {manifest_path}")
