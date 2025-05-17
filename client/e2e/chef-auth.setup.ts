import { test } from '@playwright/test'
import path from 'path'

const chefFile = path.join(__dirname, './.auth/chef.json')

test('chef login', async ({ page }) => {
  const chefname = process.env['CHEF_USERNAME']
  const password = process.env['CHEF_PASSWORD']

  if (!chefname || !password)
    throw new Error(
      'CHEF_USERNAME and/or CHEF_PASSWORD environment variables not found for login.'
    )

  await page.goto('/register')

  await page.getByTestId('register-name-input').fill(chefname)

  await page.getByTestId('password-input').fill(password)
  await page.getByTestId('password-input').press('Enter')

  // when redirected to main page, you are logged in
  await page.waitForURL('/')

  await page.context().storageState({ path: chefFile })
})
