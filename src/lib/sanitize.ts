/**
 * Velmi jednoduchá sanitizace HTML z interního WYSIWYG editoru.
 * Editor generuje jen omezenou sadu tagů (b, i, u, p, br, ul, ol, li, a, h3),
 * takže není potřeba těžká knihovna — odstraníme jen potenciálně nebezpečné prvky.
 */
const ALLOWED_TAGS = [
  "p",
  "br",
  "b",
  "strong",
  "i",
  "em",
  "u",
  "ul",
  "ol",
  "li",
  "a",
  "h3",
];

export function sanitizeRichText(html: string): string {
  if (!html) return "";

  // Odstranit script/style bloky a jejich obsah
  let clean = html.replace(
    /<(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi,
    ""
  );

  // Odstranit event handlery (onclick, onerror, ...) a javascript: odkazy
  clean = clean.replace(/\son\w+="[^"]*"/gi, "");
  clean = clean.replace(/\son\w+='[^']*'/gi, "");
  clean = clean.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');

  // Odstranit tagy, které nejsou v allowlistu (ponechat jejich textový obsah)
  clean = clean.replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (match, tag) => {
    const tagLower = tag.toLowerCase();
    if (ALLOWED_TAGS.includes(tagLower)) {
      // u <a> ponecháme jen href atribut
      if (tagLower === "a") {
        const hrefMatch = match.match(/href\s*=\s*"([^"]*)"/i);
        const isClosing = match.startsWith("</");
        if (isClosing) return "</a>";
        return hrefMatch
          ? `<a href="${hrefMatch[1]}" target="_blank" rel="noopener noreferrer">`
          : "<a>";
      }
      return match.startsWith("</") ? `</${tagLower}>` : `<${tagLower}>`;
    }
    return "";
  });

  return clean;
}
