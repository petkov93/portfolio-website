import { defineConfig } from '@playwright/test';

const previewHost = '127.0.0.1';
const previewPort = 4173;
const previewUrl = `http://${previewHost}:${previewPort}`;
const previewCommand = `npm run preview -- --port ${previewPort} --host ${previewHost}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  reporter: 'list',
  use: {
    baseURL: previewUrl,
    trace: 'on-first-retry',
  },
  webServer: {
    // CI runs `npm run build` before `npm test`; avoid building twice there.
    command: process.env.CI ? previewCommand : `npm run build && ${previewCommand}`,
    url: previewUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
