import { Locator, Page } from '@playwright/test'

export class DashboardPage { 
  readonly page: Page
  public message: Locator
  public secretMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.message = page.locator('//p[@class="welcome-message"]')
    this.secretMessage = page.locator('//p[@class="secret-message"]')
  }
}