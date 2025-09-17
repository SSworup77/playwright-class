import test, { expect } from "@playwright/test";
import path from "path";

test.describe('Practice form input testing', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://demoqa.com/automation-practice-form")
    })
    test('should successfully submit if all required fields are filled', async ({ page }) => {
        const firstName = page.locator("#firstName")
        const lastName = page.locator("#lastName")
        const email = page.locator("#userEmail")
        const maleRadio = page.locator("//label[text()='Male']")
        const mobileNumber = page.locator("#userNumber")
        const dob = page.locator("#dateOfBirthInput")
        const subject = page.locator("#subjectsInput")
        const hobbies = page.locator("//label[text()='Sports']")
        const address = page.locator("#currentAddress")
        const state = page.locator("#state")
        const state2 = page.locator("//div[text()='Haryana']")
        const city = page.locator("#city")
        const city2 = page.locator("//div[text()='Panipat']")
        const submitBtn = page.locator("//button[@type='submit']")
        await firstName.fill("First")
        await lastName.fill("Last")
        await email.fill("firstlast@gmail.com")
        await maleRadio.check();
        await mobileNumber.fill("9841456243")
        await dob.fill("14 Sep 2002")
        await subject.fill("Physics")
        await page.keyboard.press("Enter")
        await subject.fill("Chemistry")
        await page.keyboard.press("Enter")
        await hobbies.check()
        await page.getByLabel('Select picture').setInputFiles(path.join(__dirname, 'image.png'));
        await address.fill("First Last ko ghar")
        await state.click()
        await state2.click()
        await city.click()
        await city2.click()
        await submitBtn.click()
        await expect(page.locator("//div[@role='dialog']")).toBeVisible()
        await expect(page.locator('//tbody/tr[1]/td[2][text()="First Last"]')).toBeVisible()
    })
})