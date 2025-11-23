import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/en'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderPage } from '../pages/order-page'

let authPage: LoginPage
let orderCreationPage: OrderPage

test.beforeEach(async ({ page }) => {
  authPage = new LoginPage(page)
  await authPage.open()
})

test('signIn button disabled when incorrect data inserted', async ({}) => {
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(7))
  await expect(authPage.signInButton).toBeDisabled()
})

test.describe('Login and verify elements on the “Order Creation” page', async () => {
  test.beforeEach(async () => {
    orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  })
  test('login with correct credentials and verify order BUTTONS in the creation page', async ({}) => {
    await expect(orderCreationPage.statusButton).toBeVisible()
    await expect(orderCreationPage.orderButton).toBeVisible()
    await expect(orderCreationPage.logoutButton).toBeVisible()
    await expect(orderCreationPage.englishLanguageButton).toBeVisible()
    await expect(orderCreationPage.russianLanguageButton).toBeVisible()
  })

  test('login with correct credentials and verify order FIELDS in the creation page', async ({}) => {
    await expect(orderCreationPage.usernameField).toBeVisible()
    await expect(orderCreationPage.phoneField).toBeVisible()
    await expect(orderCreationPage.commentField).toBeVisible()
  })

  test('login with correct credentials and verify order LINKS in the creation page', async ({}) => {
    await expect(orderCreationPage.homePage).toBeVisible()
    await expect(orderCreationPage.privacyPolicyPage).toBeVisible()
    await expect(orderCreationPage.cookiePolicyPage).toBeVisible()
    await expect(orderCreationPage.termsOfServices).toBeVisible()
  })

  test('login with correct credentials and verify order TEXTS in the creation page', async ({}) => {
    await expect(orderCreationPage.titleTextField).toBeVisible()
    await expect(orderCreationPage.highlightedTextTitleField).toBeVisible()
    await expect(orderCreationPage.createOrderTextTitleField).toBeVisible()
    await expect(orderCreationPage.trainingAppText).toBeVisible()
  })
})

test('Login and create an order successfully', async ({}) => {
  orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.createOrder()
  await expect(orderCreationPage.notificationPopupText).toBeVisible()
  await expect(orderCreationPage.notificationPopupCloseButton).toBeVisible()
  await expect(orderCreationPage.notificationPopupOkButton).toBeVisible()
})

test.describe('Login and verify validation errors during order creation', async () => {
  test.beforeEach(async () => {
    orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  })
  test('login with correct credentials and verify Validation error message appears for empty username field', async ({}) => {
    await orderCreationPage.usernameField.fill(faker.string.alpha({ length: 1 }))
    await orderCreationPage.usernameField.clear()
    await orderCreationPage.phoneField.fill(faker.string.alpha({ length: 6 }))
    await expect(orderCreationPage.blankField).toBeVisible()
  })

  test('login with correct credentials and verify Validation error message appears for empty phone field', async ({}) => {
    await orderCreationPage.usernameField.fill(faker.string.alpha({ length: 4 }))
    await orderCreationPage.phoneField.fill(faker.string.alpha({ length: 6 }))
    await orderCreationPage.phoneField.clear()
    await expect(orderCreationPage.blankField).toBeVisible()
  })

  test('login with correct credentials and verify Validation error message appears for short username field', async ({}) => {
    await orderCreationPage.usernameField.fill(faker.string.alpha({ length: 1 }))
    await expect(orderCreationPage.usernameError).toBeVisible()
  })

  test('login with correct credentials and verify Validation error message appears for short phone field', async ({}) => {
    await orderCreationPage.usernameField.fill(faker.string.alpha({ length: 4 }))
    await orderCreationPage.phoneField.fill(faker.string.alpha({ length: 4 }))
    await expect(orderCreationPage.phoneError).toBeVisible()
  })

  test('login with correct credentials and verify Validation error message appears and order button is disabled', async ({}) => {
    await orderCreationPage.usernameField.fill(faker.string.alpha({ length: 1 }))
    await orderCreationPage.phoneField.fill(faker.string.alpha({ length: 4 }))
    await expect(orderCreationPage.usernameError).toBeVisible()
    await expect(orderCreationPage.phoneError).toBeVisible()
    await expect(orderCreationPage.orderButton).toBeDisabled()
  })
})

test('login with correct credentials and Logout ', async ({}) => {
  orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logoutButton.click()
  await expect(authPage.signInButton).toBeVisible()
  await expect(authPage.usernameField).toBeVisible()
  await expect(authPage.passwordField).toBeVisible()
})
