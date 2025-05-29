import { test, expect } from '../config/fixtures'
import { UserRole } from '../users'

test.describe('Role-Based Dashboard Message', () => {

  // testUser fixture is the user from the project metadata
  test('User can see role in message', async ({ dashboardPage, testUser }) => {

    // welcome message based on the test user's information
    const welcomeMessage = `Welcome, ${testUser.username}! Role: ${testUser.role}`

    // message intended for admins only
    const secretAdminMessage = 'This is a secret message for admins only.'

    // additional role-based assertions
    if (testUser.role === UserRole.ADMIN) {
      await expect(dashboardPage.secretMessage).toBeVisible()
      await expect(dashboardPage.secretMessage).toHaveText(secretAdminMessage, { ignoreCase: true })
    } else {
      await expect(dashboardPage.secretMessage).toBeHidden()
    }

    // checks any user has the correct welcome message
    await expect(dashboardPage.message).toHaveText(welcomeMessage, { ignoreCase: true })
  })
})