import { test, expect } from '@playwright/test'
import path from 'path'

const chefFile = path.join(__dirname, './.auth/chef.json')

// should register
// should logout
// should login

test('should delete chef', async ({ page, isMobile }) => {
  const chefname = process.env['CHEF_USERNAME']
  const password = process.env['CHEF_PASSWORD']

  if (!chefname || !password)
    throw new Error(
      'CHEF_USERNAME and/or CHEF_PASSWORD environment variables not found for deletion.'
    )

  await page.goto('/login')
  await page.getByTestId('login-name-input').fill(chefname)
  await page.getByTestId('password-input').fill(password)
  await page.getByTestId('password-input').press('Enter')

  await page.waitForURL('/') // wait for change detection log in

  await page.goto('/delete-chef')

  await page.getByTestId('password-input').fill(password)
  await page.getByTestId('password-input').press('Enter')

  // when redirected to main page, you are deleted. Get the eff out (╯‵□′)╯︵┻━┻
  await page.waitForURL('/')

  if (isMobile) await page.getByTestId('open-menu-button').click()

  await page.getByTestId('login-button').click()

  await page.getByTestId('login-name-input').fill(chefname)
  await page.getByTestId('password-input').fill(password)
  await page.getByTestId('password-input').press('Enter')

  await page.waitForSelector('[data-test="feedback-message"]')
  await expect(page.getByTestId('feedback-message')).toHaveText(
    /Benutzer nicht gefunden/
  )

  await page.context().storageState({ path: chefFile })
})
