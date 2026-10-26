import { expect, test, type Page } from '@playwright/test'

// first run `npm run build` then `npm run preview` to run the built app
const appUrl = 'http://127.0.0.1:4173'
const coverImage = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

// mocks itunes response:
// 1. we don't need to test 3rd party apis
// 2. itunes limits 20 requests per minute, so tests would fail at scale
async function stubItunes(page: Page) {
  await page.route(
    /^https:\/\/itunes\.apple\.com\/search(?:\?.*)?$/,
    async (route) => {
      const term =
        new URL(route.request().url()).searchParams.get('term')?.toLowerCase()

      const results =
        term === 'matching'
          ? Array.from({ length: 20 }, (_, index) => ({
            trackName: `Matching Song ${index + 1}`,
            collectionName: `Matching Album ${index + 1}`,
            artistName: 'Matching Artist',
            artworkUrl100: coverImage,
            previewUrl: '',
          }))
          : []

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        headers: { 'access-control-allow-origin': '*' },
        body: JSON.stringify({ resultCount: results.length, results }),
      })
    },
  )
}

test('shows matching results in groups of ten and loads ten more on scroll', async ({
  page,
}) => {
  await stubItunes(page)
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.goto(appUrl)

  await page.getByRole('textbox', { name: 'Search' }).fill('matching')
  await page.getByRole('button', { name: 'Search' }).click()

  const songs = page.getByRole('heading', {
    name: /^Matching Song \d+$/,
  })

  await expect(songs).toHaveCount(10)
  await expect(page.getByRole('heading', { name: 'Matching Album 1', exact: true })).toBeVisible()
  await expect(page.getByText('Matching Artist', { exact: true }).first()).toBeVisible()

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))

  await expect(songs).toHaveCount(20)
})

test('notifies me when a search has no results', async ({ page }) => {
  await stubItunes(page)
  await page.goto(appUrl)

  await page.getByRole('textbox', { name: 'Search' }).fill('noresults')
  await page.getByRole('button', { name: 'Search' }).click()

  await expect(page.getByRole('alert')).toContainText(
    'There are no results for the entered search term',
  )
})
