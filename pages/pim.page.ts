import { Locator, Page } from "@playwright/test";

class PIMOption {
    readonly page: Page
    readonly pimOption: Locator
    readonly pimHeader: Locator
    readonly addEmployeeLink: Locator;
    readonly employeeListLink: Locator;
    constructor(page: Page) {
        this.page = page
        this.pimOption = page.locator("//a[contains(@href,'viewPimModule')]")
        this.pimHeader = page.locator("//h6[text()='PIM']")
        this.addEmployeeLink = page.locator("//li/a[text()='Add Employee']");
        this.employeeListLink = page.locator("//li/a[text()='Employee List']");
    }
    async navigateToPIM() {
        await this.pimOption.click();
        await this.pimHeader.waitFor({ state: 'visible' });
    }

    async navigateToAddEmployee() {
        await this.addEmployeeLink.click();
    }

    async navigateToEmployeeList() {
        await this.employeeListLink.click();
    }
}

export { PIMOption }