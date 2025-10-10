import { Locator, Page } from "@playwright/test"

class AddEmployees {
    page: Page
    readonly addEmployeeBtn: Locator
    readonly firstName: Locator
    readonly middleName: Locator
    readonly lastName: Locator
    readonly employeeId: Locator
    readonly fileChooser: Locator
    readonly imageLoc: Locator
    readonly loginToggle: Locator
    readonly usernameField: Locator
    readonly passwordField: Locator
    readonly saveBtn: Locator
    constructor(page: Page) {
        this.page = page
        this.addEmployeeBtn = page.locator("//li/a[text()='Add Employee']")
        this.firstName = page.locator("//input[@name='firstName']")
        this.middleName = page.locator("//input[@name='middleName']")
        this.lastName = page.locator("//input[@name='lastName']")
        this.employeeId = page.locator("//label[text()='Employee Id']/following::input[1]")
        this.fileChooser = page.locator("//div[@class='employee-image-wrapper']")
        this.imageLoc = page.locator("//div[@class='employee-image-wrapper']")
        this.loginToggle = page.locator("//span[contains(@class,'oxd-switch-input')]")
        this.usernameField = page.locator("//div[contains(@class,'oxd-form-row')][3]//input[contains(@class,'oxd-input')]")
        this.passwordField = page.locator("//div[contains(@class,'user-password-row')]//input[contains(@class,'oxd-input--active')]")
        this.saveBtn = page.locator("//button[@type='submit']")
    }
}

export { AddEmployees }