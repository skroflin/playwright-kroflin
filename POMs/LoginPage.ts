import { expect, Locator, Page } from "@playwright/test";

export class JefitLoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.getByLabel('Username or email');
        this.passwordField = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: /log in/i });
        this.errorMessage = page.locator('p[data-slot="error"]');
    }

    async login(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}

export default JefitLoginPage;