import test, { chromium, expect } from "@playwright/test";

// test('Example', async () => {

// })

test.describe("Text box testing", () => {
    test.beforeEach(async ({ page }) => {
        // const browser = await chromium.launch()
        // const context = await browser.newContext()
        // const page = await context.newPage()
        await page.goto("https://demoqa.com/text-box", { waitUntil: "domcontentloaded" })
    })
    test("should fill the form", async ({ page }) => {
        await page.locator("#userName").fill("Sworup")
        await page.locator("#userEmail").fill("sworupemail@gmail.com")
        await page.locator("#currentAddress").fill("Baneshwor")
        await page.locator("#permanentAddress").fill("Banasthali,KTM, Nepal")
        await page.locator("#submit").click()
    })

})
test.describe("check box testing", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://demoqa.com/checkbox")
    })
    test("should expand all the checkbox", async ({ page }) => {
        await expect(page.locator("//span[text()='Excel File.doc']")).not.toBeVisible()
        await page.locator("//button[@title='Expand all']").click()
        await expect(page.locator("//span[text()='Excel File.doc']")).toBeVisible()
    })
    test("should collapse all the items", async ({ page }) => {
        await expect(page.locator("//span[text()='Excel File.doc']")).not.toBeVisible()
        await page.locator("//button[@title='Expand all']").click()
        await expect(page.locator("//span[text()='Excel File.doc']")).toBeVisible()
        await page.locator("//button[@title='Collapse all']").click()
        await expect(page.locator("//span[text()='Excel File.doc']")).not.toBeVisible()
    })
    test('should check all items when root checkbox is checked', async ({ page }) => {
        const rootLabel = page.locator("//label[@for='tree-node-home']")
        await rootLabel.click()
        const homeCheckbox = page.locator('#tree-node-home')
        await expect(homeCheckbox).toBeChecked()
        ////span[contains(text(), 'Home')]/preceding-sibling::span[@class='rct-checkbox']
    })
})