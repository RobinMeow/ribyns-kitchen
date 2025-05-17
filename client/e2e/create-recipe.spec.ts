import { expect, test } from '@playwright/test'

test('should create recipe', async ({ page }) => {
  await page.goto('/new-recipe')
  await page.waitForURL('/')
  await expect(page).toHaveURL('/')
})
