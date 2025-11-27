import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/en'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderNotFoundPage } from '../pages/order-not-found-page'
import { OrderFound } from '../pages/order-found'

test('signIn button disabled when incorrect data inserted', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(7))
  await expect(authPage.signInButton).toBeDisabled()
  await authPage.verifyPolicyLinksInTheFooter()
})

test.describe('Login and verify elements on the “Order Creation” page', async () => {
  test('login with correct credentials and verify order BUTTONS in the creation page', async ({
    page,
  }) => {
    const authPage = new LoginPage(page)
    await authPage.open()
    const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
    await orderCreationPage.verifyLanguageSelector()
    await expect(orderCreationPage.statusButton).toBeVisible()
    await expect(orderCreationPage.orderButton).toBeVisible()
    await expect(orderCreationPage.logoutButton).toBeVisible()
    // await expect(orderCreationPage.englishLanguageButton).toBeVisible()
    // await expect(orderCreationPage.russianLanguageButton).toBeVisible()
  })

  test('login with correct credentials and verify order FIELDS in the creation page', async ({
    page,
  }) => {
    const authPage = new LoginPage(page)
    await authPage.open()
    const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
    await expect(orderCreationPage.usernameField).toBeVisible()
    await expect(orderCreationPage.phoneField).toBeVisible()
    await expect(orderCreationPage.commentField).toBeVisible()
  })

  test('login with correct credentials and verify order LINKS in the creation page', async ({
    page,
  }) => {
    const authPage = new LoginPage(page)
    await authPage.open()
    const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
    await expect(orderCreationPage.homePage).toBeVisible()
    await orderCreationPage.verifyPolicyLinksInTheFooter()
  })

  test('login with correct credentials and verify order TEXTS in the creation page', async ({
    page,
  }) => {
    const authPage = new LoginPage(page)
    await authPage.open()
    const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
    await expect(orderCreationPage.titleTextField).toBeVisible()
    await expect(orderCreationPage.highlightedTextTitleField).toBeVisible()
    await expect(orderCreationPage.createOrderTextTitleField).toBeVisible()
    await expect(orderCreationPage.trainingAppText).toBeVisible()
  })
})

test('Login and create an order successfully', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.createOrder()
  await expect(orderCreationPage.notificationPopupText).toBeVisible()
  await expect(orderCreationPage.notificationPopupCloseButton).toBeVisible()
  await expect(orderCreationPage.notificationPopupOkButton).toBeVisible()
})

test.describe('Login and verify validation errors during order creation', async () => {
  test('login with correct credentials and verify Validation error message appears for empty username field', async ({
    page,
  }) => {
    const authPage = new LoginPage(page)
    await authPage.open()
    const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
    await orderCreationPage.usernameField.fill(faker.string.alpha({ length: 1 }))
    await orderCreationPage.usernameField.clear()
    await orderCreationPage.phoneField.fill(faker.string.alpha({ length: 6 }))
    await expect(orderCreationPage.blankField).toBeVisible()
  })

  test('login with correct credentials and verify Validation error message appears for empty phone field', async ({
    page,
  }) => {
    const authPage = new LoginPage(page)
    await authPage.open()
    const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
    await orderCreationPage.usernameField.fill(faker.string.alpha({ length: 4 }))
    await orderCreationPage.phoneField.fill(faker.string.alpha({ length: 6 }))
    await orderCreationPage.phoneField.clear()
    await expect(orderCreationPage.blankField).toBeVisible()
  })

  test('login with correct credentials and verify Validation error message appears for short username field', async ({
    page,
  }) => {
    const authPage = new LoginPage(page)
    await authPage.open()
    const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
    await orderCreationPage.usernameField.fill(faker.string.alpha({ length: 1 }))
    await expect(orderCreationPage.usernameError).toBeVisible()
  })
  test('login with correct credentials and verify Validation error message appears for short phone field', async ({
    page,
  }) => {
    const authPage = new LoginPage(page)
    await authPage.open()
    const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
    await orderCreationPage.usernameField.fill(faker.string.alpha({ length: 4 }))
    await orderCreationPage.phoneField.fill(faker.string.alpha({ length: 4 }))
    await expect(orderCreationPage.phoneError).toBeVisible()
  })

  test('login with correct credentials and verify Validation error message appears and order button is disabled', async ({
    page,
  }) => {
    const authPage = new LoginPage(page)
    await authPage.open()
    const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
    await orderCreationPage.usernameField.fill(faker.string.alpha({ length: 1 }))
    await orderCreationPage.phoneField.fill(faker.string.alpha({ length: 4 }))
    await expect(orderCreationPage.usernameError).toBeVisible()
    await expect(orderCreationPage.phoneError).toBeVisible()
    await expect(orderCreationPage.orderButton).toBeDisabled()
  })
})

test('login with correct credentials and Logout ', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logoutButton.click()
  await expect(authPage.signInButton).toBeVisible()
  await expect(authPage.usernameField).toBeVisible()
  await expect(authPage.passwordField).toBeVisible()
})

test('Verify language toggle is visible', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  await authPage.verifyLanguageSelector()
})

test('Verify order not found page', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.click()
  await orderCreationPage.searchOrderInput.fill('9999999')
  await orderCreationPage.searchOrderSubmitButton.click()
  const orderNotFound = new OrderNotFoundPage(page)
  await expect(orderNotFound.orderNotFoundTitle).toBeVisible()
  await orderNotFound.verifyPolicyLinksInTheFooter()
})

test('Verify order found page', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.click()
  await orderCreationPage.searchOrderInput.fill('13495')
  await orderCreationPage.searchOrderSubmitButton.click()
  const orderFound = new OrderFound(page)
  await expect(orderFound.statuslistItem).toBeVisible()
  await orderFound.verifyPolicyLinksInTheFooter()
})
