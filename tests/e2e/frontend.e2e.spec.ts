import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('home page renders the Arduwyn site', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Arduwyn/)
  })

  test('architecture page renders', async ({ page }) => {
    await page.goto('/architecture')
    await expect(page).toHaveTitle(/Zero Trust Architecture/)
  })
})
