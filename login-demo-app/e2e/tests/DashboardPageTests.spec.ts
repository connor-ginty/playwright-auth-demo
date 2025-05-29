import { test, expect } from '../config/fixtures'
import { UserRole } from '../users'

test.describe('Role-Based Dashboard Message', () => {

  // testUser fixture is the user from the project metadata
  test('User can see role in message', async ({ dashboardPage, testUser }) => {
    
    // conditionally skips test case if first argument is true
    test.skip(testUser.role === UserRole.MANAGER, 'Manager role does not fit this test case.')

    // welcome message based on the test user's information
    let welcomeMessage = `Welcome, ${testUser.username}! Role: ${testUser.role}`

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