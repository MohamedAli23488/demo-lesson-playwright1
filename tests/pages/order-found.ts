import { BasePage } from './base-page'
import type { Locator, Page } from '@playwright/test'

export class OrderFound extends BasePage{
  readonly statuslistItem: Locator


  constructor(page: Page) {
    super(page)
    this.statuslistItem = page.getByTestId('status-item-0')
  }
}