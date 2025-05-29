import { Locator, Page } from '@playwright/test'
import { type UserProfile } from '../users'

export class LoginPage {
  readonly page: Page
  private usernameInput: Locator
  private passwordInput: Locator
  private loginButton: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.getByRole('textbox', { name: 'Username' })
    this.passwordInput = page.getByRole('textbox', { name: 'Password' })
    this.loginButton = page.getByRole('button', { name: 'Login' })
  }

  async loginWithUser(user: UserProfile) {
    await this.usernameInput.waitFor({ state: 'visible' })
    await this.passwordInput.waitFor({ state: 'visible' })
    await this.usernameInput.fill(user.username)
    await this.passwordInput.fill(user.password)
    await this.loginButton.click()

    // writing user login data for other tests to use without logging for each test
    await this.page.context().storageState({ path: user.storageState })
  }
}