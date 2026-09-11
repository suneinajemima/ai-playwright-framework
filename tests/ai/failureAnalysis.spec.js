const { test, expect } = require('@playwright/test'); 
test('AI failure analysis demo', async ({ page }) => {
    await page.goto('/');

    await expect(
        page.getByRole('button', { name: 'Login' })
    ).toBeVisible();
});