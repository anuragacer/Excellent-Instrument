import urllib3, requests, re
from bs4 import BeautifulSoup
urllib3.disable_warnings()

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
}

for page in ['page/about-us', 'page/about-owner', 'page/accrediation', 'page/calibration']:
    url = f"https://www.excellentservices.co.in/{page}"
    r = requests.get(url, headers=headers, verify=False)
    if r.status_code == 200:
        soup = BeautifulSoup(r.text, 'html.parser')
        main = soup.find(class_=re.compile(r'about|content|detail', re.I)) or soup.find('body')
        print(f"=== {page} ===")
        # print text
        print(main.get_text(separator=' ', strip=True)[:600])
        print("\n" + "="*40 + "\n")
