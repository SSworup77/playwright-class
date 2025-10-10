import { Locator, Page } from "@playwright/test"

class AddEmployees {
    page: Page
    readonly addEmployeeHeader: Locator
    readonly addEmployeeBtn: Locator
    readonly firstNameField: Locator
    readonly middleNameField: Locator
    readonly lastNameField: Locator
    readonly employeeIdField: Locator
    readonly fileChooser: Locator
    readonly imageLoc: Locator
    readonly loginToggle: Locator
    readonly usernameField: Locator
    readonly passwordField: Locator
    readonly saveBtn: Locator
    constructor(page: Page) {
        this.page = page
        this.addEmployeeHeader = page.locator('//h6[text()="Add Employee"]')
        this.addEmployeeBtn = page.locator("//li/a[text()='Add Employee']")
        this.firstNameField = page.locator("//input[@name='firstName']")
        this.middleNameField = page.locator("//input[@name='middleName']")
        this.lastNameField = page.locator("//input[@name='lastName']")
        this.employeeIdField = page.locator("//label[text()='Employee Id']/following::input[1]")
        this.fileChooser = page.locator("//div[@class='employee-image-wrapper']")
        this.imageLoc = page.locator("//div[@class='employee-image-wrapper']")
        this.loginToggle = page.locator("//span[contains(@class,'oxd-switch-input')]")
        this.usernameField = page.locator("//div[contains(@class,'oxd-form-row')][3]//input[contains(@class,'oxd-input')]")
        this.passwordField = page.locator("//div[contains(@class,'user-password-row')]//input[contains(@class,'oxd-input--active')]")
        this.saveBtn = page.locator("//button[@type='submit']")
    }
    async fillEmployeeDetails(firstName: string, middleName: string, lastName: string, employeeId: string) {
        await this.firstNameField.fill(firstName);
        await this.middleNameField.fill(middleName);
        await this.lastNameField.fill(lastName);
        await this.employeeIdField.fill("");
        await this.employeeIdField.fill(employeeId);
    }
    async uploadProfileImage(imagePath: string) {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.imageLoc.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(imagePath);
    }
    async enableLoginToggle() {
        await this.loginToggle.click()
    }
    async fillLoginDetails(username: string, password: string) {
        await this.usernameField.fill(username)
        await this.passwordField.first().fill(password)
        await this.passwordField.last().fill(password)
    }
    async saveEmployee() {
        await this.saveBtn.click();
    }
}

export { AddEmployees }