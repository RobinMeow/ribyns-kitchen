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

  await page.goto('/login')

  await page.getByTestId('login-name-input').fill(chefname)

  await page.getByTestId('password-input').fill(password)
  await page.getByTestId('password-input').press('Enter')

  // when the logout button becomes visible, we are logged in
  await page.getByTestId('logout-button').waitFor({
    state: 'visible',
    timeout: 5000
  })

  await page.context().storageState({ path: chefFile })
})
