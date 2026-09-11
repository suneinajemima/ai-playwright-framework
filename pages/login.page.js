class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto('/');
    }

    async login(username, password) {
        if (username !== undefined) {
            await this.usernameInput.fill(username);
        }
        if (password !== undefined) {
            await this.passwordInput.fill(password);
        }
        await this.loginButton.click();
    }
}

module.exports = { LoginPage };