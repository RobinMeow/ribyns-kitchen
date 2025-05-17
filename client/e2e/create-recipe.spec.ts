import { test } from '@playwright/test'

test('should create recipe and redirect to recipe view', async ({ page }) => {
  await page.goto('/new-recipe')
  await page.getByTestId('recipe-name-input').fill('New Recipe')
  await page.getByTestId('new-recipe-submit-button').click()
  await page.waitForURL('/recipe/*')
})
