function movePageToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function createParamsString(urlParams: Record<string, string | number>): string {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(urlParams)) {
    params.set(key, String(value))
  }

  return params.toString()
}

export { movePageToTop, createParamsString }
