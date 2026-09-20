import asyncio
import os
from playwright.async_api import async_playwright

BRAIN_DIR = r"C:\Users\Administrator\.gemini\antigravity\brain\1a412906-96be-444c-b661-2ca4c1d6b410"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # Desktop context
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()

        pages_to_capture = [
            ("http://localhost:8080/contact.html", "white_theme_contact.png"),
            ("http://localhost:8080/services.html", "white_theme_services.png"),
            ("http://localhost:8080/accreditation.html", "white_theme_accreditation.png"),
            ("http://localhost:8080/clientele.html", "white_theme_clientele.png")
        ]

        for url, fname in pages_to_capture:
            print(f"Capturing {url}...")
            await page.goto(url, wait_until="networkidle")
            await page.wait_for_timeout(1000)
            out_path = os.path.join(BRAIN_DIR, fname)
            await page.screenshot(path=out_path, full_page=False)
            print(f"Saved: {out_path}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
