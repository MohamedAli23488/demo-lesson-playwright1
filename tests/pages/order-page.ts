import type { Locator, Page } from '@playwright/test'
import { faker } from '@faker-js/faker/locale/ar'

export class OrderPage {
  readonly page: Page
  // buttons
  readonly statusButton: Locator
  readonly orderButton: Locator
  readonly logoutButton: Locator
  readonly englishLanguageButton: Locator
  readonly russianLanguageButton: Locator
  // Fields
  readonly usernameField: Locator
  readonly phoneField: Locator
  readonly commentField: Locator
  // Links
  readonly homePage: Locator
  readonly privacyPolicyPage: Locator
  readonly cookiePolicyPage: Locator
  readonly termsOfServices: Locator
  // // Texts
  readonly titleTextField: Locator
  readonly highlightedTextTitleField: Locator
  readonly createOrderTextTitleField: Locator
  readonly trainingAppText: Locator
  // Validation errors
  readonly blankField: Locator
  readonly usernameError: Locator
  readonly phoneError: Locator
  // Notification Pop-up
  readonly notificationPopupModule: Locator
  readonly notificationPopupCloseButton: Locator
  readonly notificationPopupText: Locator
  readonly notificationPopupOkButton: Locator

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.usernameField = page.getByTestId('username-input')
    this.phoneField = page.getByTestId('phone-input')
    this.commentField = page.getByTestId('comment-input')
    this.orderButton = page.getByTestId('createOrder-button')
    this.logoutButton = page.getByTestId('logout-button')
    this.homePage = page.getByTestId('mainPage-link')
    this.englishLanguageButton = page.getByRole('button', { name: 'EN' })
    this.russianLanguageButton = page.getByRole('button', { name: 'RU' })
    this.privacyPolicyPage = page.getByTestId('privacy-policy')
    this.cookiePolicyPage = page.getByTestId('cookie-policy')
    this.termsOfServices = page.getByTestId('terms-of-service')
    this.titleTextField = page.getByText('Tallinn')
    this.highlightedTextTitleField = page.getByText(' Delivery')
    this.createOrderTextTitleField = page.getByText(' Create order')
    this.trainingAppText = page.getByText(' Training app')
    this.blankField = page.getByText(' The field must be filled in.')
    this.usernameError = page.getByTestId('username-input-error')
    this.phoneError = page.getByTestId('phone-input-error')
    this.notificationPopupModule = page.getByTestId('orderSuccessfullyCreated-popup')
    this.notificationPopupCloseButton = page.getByTestId(
      'orderSuccessfullyCreated-popup-close-button',
    )
    this.notificationPopupText = page.getByText('Tracking code:')
    this.notificationPopupOkButton = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
  }
  async createOrder() {
    await this.usernameField.fill(faker.string.alpha({ length: 2 }))
    await this.phoneField.fill(faker.string.alpha({ length: 6 }))
    await this.orderButton.click()
    return this.notificationPopupModule
  }
}
