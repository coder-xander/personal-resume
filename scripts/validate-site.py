from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.references = []
        self.assets = []

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if "id" in attrs:
            assert attrs["id"] not in self.ids, f"Duplicate ID: {attrs['id']}"
            self.ids.add(attrs["id"])
        if attrs.get("href", "").startswith("#"):
            self.references.append(attrs["href"][1:])
        if tag == "script" and "src" in attrs:
            self.assets.append(attrs["src"])
        if tag == "link" and attrs.get("rel") in ("stylesheet", "icon"):
            self.assets.append(attrs["href"])


root = Path(__file__).resolve().parent.parent
parser = SiteParser()
parser.feed((root / "index.html").read_text(encoding="utf-8"))
for target in parser.references:
    assert target in parser.ids, f"Missing anchor: {target}"
for asset in parser.assets:
    parsed = urlsplit(asset)
    assert not parsed.scheme and not parsed.netloc, f"External asset: {asset}"
    assert not asset.startswith("/"), f"Asset is not subdirectory-safe: {asset}"
    assert (root / parsed.path).is_file(), f"Missing asset: {asset}"
print(f"Validated {len(parser.assets)} local assets and {len(parser.references)} anchors.")
