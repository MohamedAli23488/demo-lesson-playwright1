import type { Locator, Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

export abstract class BasePage {
  readonly page: Page
  readonly languageSwitcher: Locator
  readonly englishButton: Locator
  readonly russianButton: Locator
  //
  readonly privacyPolicyLink: Locator
  readonly cookiePolicyPage: Locator
  readonly termsOfServices: Locator
  //
  readonly TIMEOUT_VISIBILITY: number = 5000

  protected constructor(page: Page) {
    this.page = page
    this.languageSwitcher = page.locator('div.language')
    this.privacyPolicyLink = page.getByTestId('privacy-policy')
    this.cookiePolicyPage = page.getByTestId('cookie-policy')
    this.termsOfServices = page.getByTestId('terms-of-service')
    this.englishButton = page.locator('.language__button', { hasText: 'EN' })
    this.russianButton = page.locator('.language__button', { hasText: 'RU' })
  }

  async checkElementVisibility(element: Locator): Promise<void> {
    // better test report with 'step'
    await test.step(`Verifying element visibility: ${element}`, async () => {
      await expect(element).toBeVisible({ timeout: this.TIMEOUT_VISIBILITY })
    })
  }

  async verifyLanguageSelector(): Promise<void> {
    await test.step('Verify language selector', async () => {
      await this.checkElementVisibility(this.languageSwitcher)
      await this.checkElementVisibility(this.englishButton)
      await this.checkElementVisibility(this.russianButton)
    })
  }

  async clickElement(element: Locator) {
    await test.step(`Clicking element: ${element}`, async () => {
      await element.click()
    })
  }

  async verifyPolicyLinksInTheFooter(): Promise<void> {
    await test.step('Verify Policy Links in the footer', async () => {
      await this.checkElementVisibility(this.privacyPolicyLink)
      await this.checkElementVisibility(this.termsOfServices)
      await this.checkElementVisibility(this.cookiePolicyPage)
    })
  }

  async fillElement(element: Locator, text: string) {
    await test.step(`Filling element: ${element}`, async () => {
      await element.fill(text)
    })
  }
}
