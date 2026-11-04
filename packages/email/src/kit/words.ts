export function withIndefiniteArticle(word: string) {
  return /^[aeiou]/i.test(word) ? `an ${word}` : `a ${word}`;
}

export function displayUrl(href: string) {
  if (!URL.canParse(href)) return href;
  const url = new URL(href);
  return `${url.host}${url.pathname}`.replace(/\/$/, "");
}
