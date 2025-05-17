import { test, expect } from '@playwright/test'

test('should open/close menu', async ({ page, isMobile }) => {
  // vice versa for mobile
  await page.goto('/')
  const logoutBtn = 'logout-button'

  if (isMobile) {
    // menu is closed by default
    await expect(page.getByTestId(logoutBtn)).toBeHidden()
    await page.getByTestId('open-menu-button').click()
    await expect(page.getByTestId(logoutBtn)).toBeVisible()
    await page.getByTestId('close-menu-button').click()
    await expect(page.getByTestId(logoutBtn)).toBeHidden()
  } else {
    await expect(page.getByTestId(logoutBtn)).toBeVisible()
    await page.getByTestId('close-menu-button').click()
    await expect(page.getByTestId(logoutBtn)).toBeHidden()
    await page.getByTestId('open-menu-button').click()
    await expect(page.getByTestId(logoutBtn)).toBeVisible()
  }
})
