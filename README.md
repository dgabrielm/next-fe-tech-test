# Harmoniq

A React and TypeScript app that lets you search for song tracks by song, album or artist

## Requirements

- Node.js 22.12 or later and npm. [^https://vite.dev/guide] [^https://playwright.dev/docs/intro]
- Git

## Install

```bash
npm ci
```

Playwright needs browser binaries. Install the browsers used by the configured Playwright projects:

```bash
npx playwright install
```

If you’ve enabled the Microsoft Edge project, install Edge separately:

```bash
npx playwright install msedge
```

## Run the app locally

Start the Vite development server:

```bash
npm run dev
```

Vite prints the local URL in the terminal, usually `http://localhost:5173`.

## Build and preview

Create a production build:

```bash
npm run build
```

This runs the TypeScript build check, then creates the Vite production build in `dist/`.

Serve that build locally:

```bash
npm run preview
```

Vite prints the preview URL, usually `http://localhost:4173`. Use this to check the production build locally. For performance checks, you can run browser tools such as Lighthouse against the preview; the preview server itself is not a production hosting server.

## Tests

Run Vitest unit tests watch mode:

```bash
npm run test
```

Run eslint

```bash
npm run lint
```

Run TypeScript:

```bash
npm run typecheck
```

## Storybook

Start Storybook:

```bash
npm run storybook
```

Open the URL shown in the terminal, usually `http://localhost:6006`.

Build the static Storybook site:

```bash
npm run build-storybook
```

Stories are kept alongside their components, for example `src/components/Button.stories.tsx`. The shared preview setup applies the app’s MUI theme so components render consistently in isolation.

Unit tests and Storybook cover focused logic and component behaviour. Playwright E2E tests cover user journeys in a real browser.

## End-to-end tests with Playwright

Run E2E tests:

```bash
npm run test:e2e
```

The Playwright configuration starts the app’s production preview server for the tests. The E2E tests stub the iTunes API response so they can check search results and error states without depending on the live API.

To open Playwright’s interactive test UI:

```bash
npx playwright test --ui
```

Run E2E tests excluding MS Edge

```bash
npm run test:e2e-core
```

## Git hooks

Husky runs checks before a commit. The pre-commit hooks run checks and fail the commit if:

- There are linting errors which cannot be automatically fixed.
- The commit message does not conform to conventional commits standard (see: https://www.conventionalcommits.org/en/v1.0.0/).
- There are TypeScript errors.
- The Unit Tests fail.
- The Playwright E2E tests fail

Commit and bypass pre-commit hooks (Not Recommended!) (syntax will vary for windows depending on Windows shell)

```bash
HUSKY=0 git commit -m "your message"
```