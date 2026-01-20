import { test, expect } from "@playwright/test";
import JefitLoginPage from "../POMs/LoginPage";

test.use({ storageState: { cookies: [], origins: [] } });

let loginPage: JefitLoginPage;

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.jefit.com/login');
    loginPage = new JefitLoginPage(page);
    await expect(loginPage.usernameField).toBeVisible();
});

test('Successful login with username', async ({ page }) => {
    await loginPage.login(
        process.env.CORRECT_USERNAME || '',
        process.env.CORRECT_PASSWORD || ''
    );
    await expect(page).toHaveURL(/.*my-jefit/);
});

test('Successful login with email', async ({ page }) => {
    await loginPage.login(
        process.env.CORRECT_EMAIL || '',
        process.env.CORRECT_PASSWORD || ''
    );
    await expect(page).toHaveURL(/.*my-jefit/);
});

test('Login with wrong credentials shows error', async () => {
    await loginPage.login('wrong_user', 'wrong_password');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(/wrong/i);
});

test('Login with wrong password', async () => {
    await loginPage.login(
        process.env.CORRECT_USERNAME || '',
        'wrong_password'
    );
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(/wrong/i);
});