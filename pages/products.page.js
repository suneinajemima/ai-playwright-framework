class ProductsPage {
    constructor(page) {
        this.page = page;
        this.productsHeading = page.getByText('Products', { exact: true });
        this.productCards = page.locator('[data-test="inventory-item"]');
        this.productNames = page.locator('[data-test="inventory-item-name"]');
        this.productPrices = page.locator('[data-test="inventory-item-price"]');
        this.productImages = page.locator('[data-test="inventory-item"] img');
        this.backToProductsButton = page.getByRole('button', { name: 'Back to products' });
    }

    async openProduct(productName) {
        await this.page.locator('[data-test$="-title-link"]', { hasText: productName }).click();
    }

    async getProductCard(productName) {
        return this.page.locator('[data-test="inventory-item"]', {
            has: this.page.getByText(productName, { exact: true })
        });
    }
}

module.exports = { ProductsPage };