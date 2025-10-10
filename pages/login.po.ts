import { expect, Locator, Page } from "@playwright/test";

class LoginPage {
    readonly page: Page
    readonly username: Locator
    readonly password: Locator
    readonly loginBtn: Locator
    readonly errorMessage: Locator
    readonly forgotPassword: Locator
    constructor(page: Page) {
        this.page = page
        this.username = page.locator("//input[@name='username']")
        this.password = page.locator("//input[@name='password']")
        this.loginBtn = page.locator("//button[@type='submit']")
        this.errorMessage = page.locator("//p[text()='Invalid credentials']")
        this.forgotPassword = page.locator('//p[contains(@class,"orangehrm-login-forgot-header")]')
    }
    async open() {
        await this.page.goto("/web/index.php/auth/login")
    }
    async userLogin(username: string, password: string) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginBtn.click()
    }
    async assertLoginSuccess() {
        await expect(this.page.locator("//h6[text()='Dashboard']")).toBeVisible()
        await expect(this.page.locator("//a[contains(@href,'viewAdminModule')]")).toBeVisible()
    }
}

export { LoginPage }