import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

/**
 * Playwright end-to-end tests. See https://playwright.dev/docs/test-configuration.
 * The webServer block boots `pnpm dev` (reusing an already-running one locally).
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Generous timeouts: Next dev compiles each route on first hit. */
  timeout: 60_000,
  expect: { timeout: 15_000 },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
