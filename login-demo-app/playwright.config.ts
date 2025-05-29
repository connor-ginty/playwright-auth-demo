import { LOCAL_URL } from './e2e/config/constants'
import { defineConfig, devices } from '@playwright/test'
import { userProfiles } from './e2e/users'

export default defineConfig({
  testDir: './e2e/tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  workers: 4,
  reporter: [
    ['html', { outputFile: './e2e/test-results', open: 'never' }]
  ],
  projects: userProfiles.flatMap(testUser => [
    {
      name: `${testUser.role}-setup`,
      testMatch: new RegExp('.*/test\.setup\.ts$'),
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome']
      },
      metadata: { user: testUser }
    },
    {
      name: `${testUser.role}-tests`,
      dependencies: [`${testUser.role}-setup`],
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
        storageState: testUser.storageState
      },
      metadata: { user: testUser }
    }
  ]),
  webServer: {
    command: 'npm run dev',
    url: LOCAL_URL,
  }
})
