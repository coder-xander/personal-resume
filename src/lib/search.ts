export interface SearchItem {
  url: string;
  meta: { title?: string; category?: string };
  excerpt?: string;
  summary?: string;
}
export interface CatalogEntry {
  url: string;
  title: string;
  category: string;
  summary: string;
  technologies: string[];
}

export function mergeSearchResults(
  term: string,
  items: SearchItem[],
  catalog: CatalogEntry[],
): SearchItem[] {
  const query = term.trim().toLocaleLowerCase();
  const tokens = query.split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  const matched = catalog.filter((entry) => {
    const text = [entry.title, entry.summary, ...entry.technologies]
      .join(" ")
      .toLocaleLowerCase();
    return tokens.every((token) => text.includes(token));
  });
  const fromCatalog = (entry: CatalogEntry): SearchItem => ({
    url: entry.url,
    meta: { title: entry.title, category: entry.category },
    summary: entry.summary,
  });
  const titleMatches = matched
    .filter((entry) => entry.title.toLocaleLowerCase().includes(query))
    .map(fromCatalog);
  const seen = new Set<string>();
  return [...titleMatches, ...items, ...matched.map(fromCatalog)].filter(
    (item) => {
      const key = item.url.split(/[?#]/)[0].replace(/index\.html$/, "");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    },
  );
}
