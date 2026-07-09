import { defineConfig } from '@playwright/test';
import { envConfig } from './src/config/env.config';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: envConfig.baseUrl,
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    trace: 'retain-on-failure',
  },
  webServer: envConfig.shouldStartMockServer
    ? {
        command: 'npm run start:mock-api',
        url: `${envConfig.baseUrl}/health`,
        reuseExistingServer: !process.env.CI,
        timeout: 10_000,
      }
    : undefined,
  projects: [
    {
      name: 'api-tests',
      testMatch: /.*\.api\.spec\.ts/,
    },
  ],
});
