const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/login.page');

const validCredentials = {
    username: process.env.SAUCE_USERNAME,
    password: process.env.SAUCE_PASSWORD
};

test.describe('APA-1 login requirement', () => {
    test('TC-001 - Login with valid credentials [AC-1, AC-5]', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(validCredentials.username, validCredentials.password);

        await expect(page).toHaveURL(/\/inventory\.html$/);
    });

    test('TC-002 - Login with invalid credentials [AC-2]', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('invalid_user', 'invalid_password');

        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('TC-003 - Valid username with invalid password [AC-2]', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(validCredentials.username, 'invalid_password');

        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('TC-004 - Invalid username with valid password [AC-2]', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('invalid_user', validCredentials.password);

        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('TC-005 - Submit login with username missing [AC-3]', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(undefined, validCredentials.password);

        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('TC-006 - Submit login with password missing [AC-4]', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(validCredentials.username, undefined);

        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('TC-007 - Submit login with both fields missing [AC-3, AC-4]', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(undefined, undefined);

        await expect(loginPage.errorMessage).toBeVisible();
    });

});