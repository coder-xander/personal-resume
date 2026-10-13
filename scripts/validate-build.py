from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import json


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids = set()
        self.links = []
        self.assets = []
        self.indexed = False
        self.feed(text)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if "id" in attrs:
            assert attrs["id"] not in self.ids, f"Duplicate ID: {attrs['id']}"
            self.ids.add(attrs["id"])
        if "data-pagefind-body" in attrs:
            self.indexed = True
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag == "script" and attrs.get("src"):
            self.assets.append(attrs["src"])
        if tag == "link" and attrs.get("rel") in ("stylesheet", "icon"):
            self.assets.append(attrs["href"])


root = Path(__file__).resolve().parent.parent
dist = root / "dist"
prefix = "/personal-resume/"
origin = "https://coder-xander.github.io"
pages = {}
for file in dist.rglob("*.html"):
    relative = file.relative_to(dist).as_posix()
    route = prefix + (relative[:-10] if relative.endswith("index.html") else relative)
    text = file.read_text(encoding="utf-8")
    assert "/Users/" not in text, f"Local path in public output: {relative}"
    assert "模板预览" not in text and "待填写" not in text, f"Placeholder: {relative}"
    pages[route] = Page(text)

link_count = 0
for route, page in pages.items():
    for href in page.links + page.assets:
        target = urlsplit(urljoin(origin + route, href))
        if target.netloc != "coder-xander.github.io":
            continue
        assert target.path.startswith(prefix), f"Link escaped site base: {route} -> {href}"
        path = dist / unquote(target.path[len(prefix):])
        if path.is_dir():
            path /= "index.html"
        assert path.is_file(), f"Missing target: {route} -> {href}"
        if target.fragment and target.path in pages:
            assert unquote(target.fragment) in pages[target.path].ids, f"Missing anchor: {route} -> {href}"
        link_count += 1

entry = json.loads((dist / "pagefind/pagefind-entry.json").read_text())
source_count = len(list((root / "src/content/projects").glob("*.md")))
catalog = json.loads((dist / "search-catalog.json").read_text())
assert len(catalog) == source_count
for item in catalog:
    assert item["url"] in pages, f"Catalog target missing: {item['url']}"
assert entry["languages"]["zh-cn"]["page_count"] == source_count
assert sum(page.indexed for page in pages.values()) == source_count
for filename in ("pagefind.js", "pagefind-entry.json"):
    assert (dist / "pagefind" / filename).is_file()
assert not (dist / "README.md").exists()
assert not (dist / "profile.js").exists()
print(f"Validated {len(pages)} pages, {link_count} local links/assets, and {source_count} Chinese search entries.")
