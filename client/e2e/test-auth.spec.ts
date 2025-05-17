import { expect, test } from '@playwright/test'

test('redirects when logged in', async ({ page }) => {
  await page.goto('/login')
  await expect(page).toHaveURL('/')
})
