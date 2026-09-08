const {test, expect} = require('@playwright/test');
test('Verify example' , async({page})=>{
    await page.goto('/');
    await expect(page).toHaveTitle(/Example Domain/);
})