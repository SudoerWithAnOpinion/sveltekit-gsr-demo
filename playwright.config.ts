import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

// Don't forget to run `pnpx playwright install`

const config: PlaywrightTestConfig = {
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    webServer: {
        command: 'pnpm run build && pnpm run preview',
        port: 3000
    },
    testDir: './test/e2e',
    reporter: process.env.CI ? 'github' : 'list',
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
};

export default config;
