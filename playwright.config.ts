import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    timeout: 120000,
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: [['html', {open: 'never'}],
        ['junit', {outputFile: 'results.xml'}]],
    use: {
        trace: 'on-first-retry',
        screenshot: 'on',
        video: {
            mode: "retain-on-failure",
        }
    },
    projects: [
        {
            name: 'firefox',
            use: {...devices['Desktop Firefox']},
        },
        {
            name: 'Microsoft Edge',
            use: {...devices['Desktop Edge'], channel: 'msedge'},
        },
        {
            name: 'Google Chrome',
            use: {...devices['Desktop Chrome'], channel: 'chrome'},
        },
    ],
});
