import { Locator, Page } from "@playwright/test";

class LoginPage {
    readonly page: Page
    readonly username: Locator
    readonly password: Locator
    readonly loginBtn: Locator
    constructor(page: Page) {
        this.page = page
        this.username = page.locator("//input[@name='username']")
        this.password = page.locator("//input[@name='password']")
        this.loginBtn = page.locator("//button[@type='submit']")
    }
    async userLogin(username:string,password:string){
        await this.username.fill(username)
        await this.password.fill(password)
    }
    async clickLoginBtn(){
        await this.loginBtn.click()
    }
}

export { LoginPage }