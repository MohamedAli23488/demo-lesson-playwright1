import { BasePage } from './base-page'
import type { Locator, Page } from '@playwright/test'

export class OrderNotFoundPage extends BasePage {
  readonly orderNotFoundTitle: Locator

  constructor(page: Page) {
    super(page)
    this.orderNotFoundTitle = page.getByTestId('orderNotFound-container')
  }
}
