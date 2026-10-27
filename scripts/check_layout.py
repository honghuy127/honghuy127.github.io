#!/usr/bin/env python3
"""Render the built site in headless Chromium at phone, tablet, and desktop widths.

Fails on JavaScript errors, missing resources, or horizontal page overflow, and saves
full-page screenshots to tmp/screenshots/ for a visual check.
Usage: python3 scripts/check_layout.py [site_dir]   (default: _site)
Requires: pip install playwright && python3 -m playwright install chromium
"""
import functools
import http.server
import pathlib
import sys
import threading

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "_site"
OUT = ROOT / "tmp" / "screenshots"
PAGES = ["", "publications/", "talks/", "projects/", "grants/", "sitemap/", "404.html"]
VIEWPORTS = {"phone": (390, 844), "tablet": (820, 1180), "desktop": (1440, 900)}


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    handler = functools.partial(QuietHandler, directory=str(SITE))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{server.server_address[1]}/"
    problems = []

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        for name, (width, height) in VIEWPORTS.items():
            for scheme in ("light", "dark"):
                context = browser.new_context(viewport={"width": width, "height": height}, color_scheme=scheme)
                page = context.new_page()
                page.on("pageerror", lambda error: problems.append(f"JS error: {error}"))
                page.on("response", lambda r: r.status >= 400 and not r.url.endswith("404.html")
                        and problems.append(f"{r.status} {r.url}"))
                for path in PAGES:
                    page.goto(base + path, wait_until="networkidle")
                    scroll_width = page.evaluate("document.documentElement.scrollWidth")
                    if scroll_width > width:
                        problems.append(f"{name}/{scheme} /{path}: page is {scroll_width}px wide")
                    slug = path.strip("/").replace(".html", "") or "home"
                    page.screenshot(path=str(OUT / f"{name}-{scheme}-{slug}.png"), full_page=True)
                context.close()
        browser.close()
    server.shutdown()

    for problem in sorted(set(problems)):
        print(problem, file=sys.stderr)
    print(f"Screenshots saved to {OUT.relative_to(ROOT)}/")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
