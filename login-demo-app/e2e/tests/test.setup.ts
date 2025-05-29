import { test as setup } from '../config/fixtures'

// using loginPage fixture to login with user data from the testUser fixture
setup('Logging in with user', async ({ loginPage, testUser }) => {
  await loginPage.loginWithUser(testUser)
})