import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env.CI);
const runName = process.env.CAD_TEST_PROJECT || 'all';
const baseURL = 'http://127.0.0.1:4183';
const chromiumOptions = isCI ? {
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
} : {};

export default defineConfig({
  testDir: './tests/browser',
  testMatch: 'cad.spec.mjs',
  timeout: 90_000,
  expect: { timeout: 90_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  forbidOnly: isCI,
  outputDir: `artifacts/cad-browser/results-${runName}`,
  reporter: [
    ['list'],
    ['html', { outputFolder: `artifacts/cad-browser/report-${runName}`, open: 'never' }],
  ],
  use: {
    baseURL,
    viewport: { width: 1440, height: 1000 },
    acceptDownloads: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 30_000,
  },
  projects: [
    { name: 'chrome', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 }, channel: 'chrome', launchOptions: chromiumOptions } },
    { name: 'msedge', use: { ...devices['Desktop Edge'], viewport: { width: 1440, height: 1000 }, channel: 'msedge', launchOptions: chromiumOptions } },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1440, height: 1000 },
        launchOptions: isCI ? {
          firefoxUserPrefs: {
            'webgl.force-enabled': true,
            'webgl.disabled': false,
            'webgl.enable-webgl2': true,
            'gfx.webrender.software': true,
          },
        } : {},
      },
    },
  ],
  webServer: {
    command: 'node scripts/dev.mjs --static',
    env: { PORT: '4183' },
    url: `${baseURL}/cad/`,
    reuseExistingServer: !isCI,
    timeout: 30_000,
  },
});
