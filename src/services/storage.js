const URL_KEY = 'affordmed_urls_v1'

/**
 * Load all stored URLs from localStorage.
 * Returns an object where keys are short codes and values are records.
 */
export function loadUrls() {
  try {
    return JSON.parse(localStorage.getItem(URL_KEY)) || {}
  } catch {
    return {}
  }
}

/**
 * Save the map of URLs back to localStorage.
 */
export function saveUrls(map) {
  try {
    localStorage.setItem(URL_KEY, JSON.stringify(map))
  } catch (err) {
    console.error("Failed to save URLs:", err)
  }
}

/**
 * Insert or update a short URL record.
 */
export function upsertUrl(short, record) {
  const map = loadUrls()
  map[short] = record
  saveUrls(map)
}

/**
 * Get a URL record by its short code.
 */
export function getUrl(short) {
  const map = loadUrls()
  return map[short]
}

/**
 * Return all URL records as an array.
 */
export function allUrls() {
  return Object.values(loadUrls())
}

/**
 * Clear all stored URLs (for testing/debugging).
 */
export function clearUrls() {
  saveUrls({})
}

