import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { config } from './tests/support/config';

// Load environment variables from .env file (if it exists)
// This allows local development with .env file
// In CI/CD, environment variables are set directly by the pipeline
dotenv.config();

/**
 * Playwright Test Configuration
 * 
 * This configuration supports:
 * - Environment-based configuration via .env file
 * - Parallel test execution
 * - Multiple browser testing (Chromium, Firefox, WebKit)
 * - Comprehensive reporting (List, HTML, Allure)
 * - CI/CD optimization with retries and workers
 * - Test sharding via command-line flag (--shard)
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 120_000,
  expect: { timeout: 5_000 },
  outputDir: 'test-results',
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['allure-playwright', { detail: true, outputFolder: 'allure-results' }]
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Use centralized config instead of directly reading process.env
    // This ensures consistency across the entire test suite
    baseURL: config.urls.base,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
