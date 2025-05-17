import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'

const envName = process.env['ENV_NAME'] ?? 'dev'

const dotEnvPath = path.resolve(__dirname, './e2e/', '.env.' + envName)

dotenv.config({ path: dotEnvPath })

const baseUrl = process.env['CLIENT_BASE_URL']
if (!baseUrl) throw new Error('CLIENT_BASE_URL not set in .env file.')

const chefFile = 'e2e/.auth/chef.json'

/** See https://playwright.dev/docs/test-configuration. */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'], // Fail the build on CI if you accidentally left test.only in the source code.
  retries: 0,
  workers: process.env['CI'] ? 1 : undefined, // Opt out of parallel tests on CI.
  reporter: process.env['CI'] ? 'github' : 'list', // Reporter to use. See https://playwright.dev/docs/test-reporters
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: baseUrl,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    testIdAttribute: 'data-test'
  },
  webServer: {
    command: 'npx ng serve -c dev',
    url: baseUrl,
    stdout: 'pipe',
    reuseExistingServer: true
  },
  timeout: 5000,
  maxFailures: 0,
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chef-setup',
      testMatch: /chef\.setup\.ts/
    },
    {
      name: 'chef-teardown',
      testMatch: /chef\.teardown\.ts/
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: chefFile
      },
      dependencies: ['chef-setup']
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: chefFile
      },
      dependencies: ['chef-setup']
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: chefFile,
        ignoreHTTPSErrors: true
      },
      dependencies: ['chef-setup']
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        storageState: chefFile
      },
      dependencies: ['chef-setup']
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
        storageState: chefFile,
        ignoreHTTPSErrors: true
      },
      dependencies: ['chef-setup']
    }
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})
