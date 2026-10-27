/**
 * Smoothly scrolls the page to the top.
 */
function movePageToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Converts an object of string and number values into a URL-encoded query string.
 * @param urlParams - The parameters to convert.
 * @returns The URL-encoded query string.
 */
function createParamsString(urlParams: Record<string, string | number>): string {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(urlParams)) {
    params.set(key, String(value))
  }

  return params.toString()
}

export { movePageToTop, createParamsString }
