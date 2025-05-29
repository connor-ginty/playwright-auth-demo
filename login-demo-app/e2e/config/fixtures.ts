import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import { UserProfile } from '../users'
import { LOCAL_URL } from './constants'

export const test = base.extend<{
  testUser: UserProfile,
  loginPage: LoginPage,
  dashboardPage: DashboardPage }>({
    
  testUser: async ({ }, use, testInfo) => {
    // pulling user data from the test case metadata to pass to tests
    await use(testInfo.project.metadata.user as UserProfile)
  },

  loginPage: async ({ page }, use) => {
    // going to login page by default
    await page.goto(LOCAL_URL)
    await use(new LoginPage(page))
  },

  dashboardPage: async ({ page }, use) => {
    // going to dashboard page by default which is normally locked behind authentication
    // implementing storageState makes this possible
    await page.goto(`${LOCAL_URL}/dashboard`)
    await use(new DashboardPage(page))
  }
})

export const expect = test.expect