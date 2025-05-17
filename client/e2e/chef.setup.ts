import { test } from '@playwright/test'
import path from 'path'

const chefFile = path.join(__dirname, './.auth/chef.json')

// should register
// should logout
// should login

test('chef register and login', async ({ page, isMobile }) => {
  const chefname = process.env['CHEF_USERNAME']
  const password = process.env['CHEF_PASSWORD']

  if (!chefname || !password)
    throw new Error(
      'CHEF_USERNAME and/or CHEF_PASSWORD environment variables not found for login.'
    )

  await page.goto('/')

  await page.getByTestId('register-button').click()

  await page.getByTestId('register-name-input').fill(chefname)
  await page.getByTestId('password-input').fill(password)
  await page.getByTestId('password-input').press('Enter')

  // when redirected to main page, you are logged in
  await page.waitForURL('/')

  if (isMobile) {
    await page.getByTestId('open-menu-button').click()
  }

  await page.getByTestId('logout-button').click()

  await page.getByTestId('login-button').click()

  await page.getByTestId('login-name-input').fill(chefname)
  await page.getByTestId('password-input').fill(password)
  await page.getByTestId('password-input').press('Enter')

  // when redirected to main page, you are logged in
  await page.waitForURL('/')

  await page.context().storageState({ path: chefFile })
})
