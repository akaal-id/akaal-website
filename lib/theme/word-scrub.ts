export function getWordScrubColors() {
  const themeStyles = getComputedStyle(document.documentElement);
  const start =
    themeStyles.getPropertyValue("--text-muted-alpha").trim() ||
    themeStyles.getPropertyValue("--text-faint").trim();
  const end = themeStyles.getPropertyValue("--foreground").trim();
  return { start, end };
}
