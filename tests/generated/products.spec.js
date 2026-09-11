const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/login.page');
const { ProductsPage } = require('../../pages/products.page');

const validCredentials = {
    username: process.env.SAUCE_USERNAME,
    password: process.env.SAUCE_PASSWORD
};

const backpack = {
    name: 'Sauce Labs Backpack',
    price: '$29.99',
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
};

async function loginToProductsPage(page) {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(validCredentials.username, validCredentials.password);
}

test.describe('APA-11 browse products requirement', () => {
    test('TC-APA11-001 - View Products page after successful login [AC-1]', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await loginToProductsPage(page);

        await expect(page).toHaveURL(/\/inventory\.html$/);
        await expect(productsPage.productsHeading).toBeVisible();
    });

    test('TC-APA11-002 - Display available products [AC-2]', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await loginToProductsPage(page);

        await expect(productsPage.productCards.first()).toBeVisible();
        expect(await productsPage.productCards.count()).toBeGreaterThan(0);
    });

    test('TC-APA11-003 - Display required product information [AC-3]', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await loginToProductsPage(page);

        await expect(productsPage.productCards.first()).toBeVisible();
        const productCount = await productsPage.productCards.count();
        expect(productCount).toBeGreaterThan(0);

        for (let index = 0; index < productCount; index += 1) {
            await expect(productsPage.productNames.nth(index)).toBeVisible();
            await expect(productsPage.productPrices.nth(index)).toBeVisible();
            await expect(productsPage.productImages.nth(index)).toBeVisible();
        }
    });

    test('TC-APA11-004 - Open product details [AC-4]', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await loginToProductsPage(page);
        await productsPage.openProduct(backpack.name);

        await expect(page).toHaveURL(/\/inventory-item\.html\?id=\d+$/);
    });

    test('TC-APA11-005 - Display selected product details [AC-5]', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await loginToProductsPage(page);
        await productsPage.openProduct(backpack.name);

        await expect(page.getByRole('img', { name: backpack.name })).toBeVisible();
        await expect(page.getByText(backpack.name, { exact: true })).toBeVisible();
        await expect(page.getByText(backpack.price, { exact: true })).toBeVisible();
        await expect(page.getByText(backpack.description, { exact: true })).toBeVisible();
    });

    test('TC-APA11-006 - Return from product details to Products page [AC-6]', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await loginToProductsPage(page);
        await productsPage.openProduct(backpack.name);
        await productsPage.backToProductsButton.click();

        await expect(page).toHaveURL(/\/inventory\.html$/);
        await expect(productsPage.productsHeading).toBeVisible();
    });

    test('TC-APA11-007 - Product information remains consistent after navigation [AC-3, AC-4, AC-5]', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await loginToProductsPage(page);
        const productCard = await productsPage.getProductCard(backpack.name);
        const listPrice = await productCard.locator('[data-test="inventory-item-price"]').textContent();
        const listImageAlt = await productCard.locator('img').getAttribute('alt');

        await productsPage.openProduct(backpack.name);

        await expect(page.getByText(backpack.name, { exact: true })).toBeVisible();
        await expect(page.getByText(listPrice.trim(), { exact: true })).toBeVisible();
        await expect(page.getByRole('img', { name: listImageAlt })).toBeVisible();
    });
});
