import { test } from "@playwright/test";
import JefitLoginPage from "../POMs/loginPage";

test.use({ storageState: { cookies: [], origins: [] } })

let loginPage: JefitLoginPage

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    loginPage = new JefitLoginPage(page)
})

test('Succesful login', async () => {
    await loginPage.assertLoginModalHasOpened()
    await loginPage.loginWithValidCredentials()
})

test('Login with wrong credentials', async () => {
    await loginPage.assertLoginModalHasOpened()
    await loginPage.loginWithInvalidCredentials()
})

test('Login with wrong password', async () => {
    await loginPage.assertLoginModalHasOpened()
    await loginPage.loginWithWrongPassword()
})

test('Succesful login with email', async () => {
    await loginPage.assertLoginModalHasOpened()
    await loginPage.loginWithValidEmail()
})

test('Login with wrong email', async () => {
    await loginPage.assertLoginModalHasOpened()
    await loginPage.loginWithInvalidEmail()
})