import { expect, Locator, Page } from "@playwright/test";

export class JefitLoginPage {
    readonly page: Page
    loginLink: Locator
    loginModal: Locator
    usernameField: Locator
    passwordField: Locator
    loginButton: Locator

    constructor(page: Page) {
        this.page = page
        this.loginLink = page.getByRole('link', { name: 'Log in' })
        this.loginModal = page.getByRole('heading', { name: 'Log in' })
        this.usernameField = page.getByLabel('Username or email')
        this.passwordField = page.getByLabel('Password')
        this.loginButton = page.getByRole('button', { name: 'Log in' })
    }

    async assertLoginModalHasOpened() {
        await this.loginLink.click()
        await expect(this.loginModal).toBeVisible()
    }

    async loginWithValidCredentials() {
        await this.usernameField.fill(process.env.CORRECT_USERNAME || '')
        await this.passwordField.fill(process.env.CORRECT_PASSWORD || '')
        await this.loginButton.click()
    }

    async loginWithInvalidCredentials() {
        await this.usernameField.fill(process.env.INCORRECT_USERNAME || '')
        await this.passwordField.fill(process.env.INCORRECT_PASSWORD || '')
        await this.loginButton.click()
    }

    async loginWithValidEmail() {
        await this.usernameField.fill(process.env.CORRECT_EMAIL || '')
        await this.passwordField.fill(process.env.CORRECT_PASSWORD || '')
        await this.loginButton.click()
    }

    async loginWithInvalidEmail() {
        await this.usernameField.fill(process.env.INCORRECT_EMAIL || '')
        await this.passwordField.fill(process.env.CORRECT_PASSWORD || '')
        await this.loginButton.click()
    }

    async loginWithWrongPassword() {
        await this.usernameField.fill(process.env.CORRECT_USERNAME || '')
        await this.passwordField.fill(process.env.INCORRECT_PASSWORD || '')
        await this.loginButton.click()
    }
}

export default JefitLoginPage