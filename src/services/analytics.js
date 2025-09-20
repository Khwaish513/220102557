export function getCoarseGeo() {
  return {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    lang: navigator.language
  }
}
