import { Locator, Page } from "@playwright/test";

class PIMOption {
    readonly page: Page
    readonly pimOption: Locator
    readonly pimHeader: Locator
    constructor(page: Page) {
        this.page = page
        this.pimOption = page.locator("//a[contains(@href,'viewPimModule')]")
        this.pimHeader = page.locator("//h6[text()='PIM']")
    }
}

export { PIMOption }