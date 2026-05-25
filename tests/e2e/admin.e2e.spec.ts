import { test, expect } from '@playwright/test'

test.describe('Admin panel', () => {
  test('admin authentication screen renders an email field', async ({ page }) => {
    await page.goto('/admin')
    // Whether the panel shows "log in" or "create first user", it must render an email field.
    await expect(page.locator('#field-email')).toBeVisible()
  })
})
