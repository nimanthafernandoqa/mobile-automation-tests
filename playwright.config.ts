import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // Where Playwright looks for test files
  testDir: './tests',

  // Run tests in parallel for speed
  fullyParallel: true,

  // Fail the build if you accidentally left test.only in the code
  forbidOnly: !!process.env.CI,

  // Retry failed tests once in CI only
  retries: process.env.CI ? 1 : 0,

  // How many parallel workers to use
  workers: process.env.CI ? 2 : 4,

  // Report settings — generates a nice HTML report
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'] // shows test names in terminal as they run
  ],

  use: {
    // Base URL — all page.goto('/path') calls use this
    baseURL: 'https://practicetestautomation.com',

    // Take a screenshot automatically when a test fails
    screenshot: 'only-on-failure',

    // Record a video of every test — great for debugging
    video: 'retain-on-failure',

    // How long to wait for actions like click, fill
    actionTimeout: 10000,

    // How long to wait for a page to load
    navigationTimeout: 30000,
  },

  projects: [
    {
      // Run tests in Chromium (Chrome)
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
