const { test, expect } = require('@playwright/test');

test('SauceDemo login page loads', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Swag Labs');
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
});