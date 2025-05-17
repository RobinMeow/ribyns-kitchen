import { test, expect } from '@playwright/test'

test('view recipe should display values', async ({ page }) => {
  await page.goto('/recipe/11111111-1111-1111-1111-111111111111')
  await expect(page.getByTestId('title')).toHaveText('Pfannenkuchen')
})
