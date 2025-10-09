import test, { expect } from "@playwright/test";
import path from "path";
import { PracticeForm } from "../pages/practiceForm.po";

test.describe('Practice form input testing', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://demoqa.com/automation-practice-form")
    })
    test('should successfully submit if all required fields are filled', async ({ page }) => {
        const practiceForm = new PracticeForm(page)
        await practiceForm.userInfo("First", "Last", "firstlast@gmail.com","9841456243", "14 Sep 2002")
        await practiceForm.subjectInfo("Physics", "Chemistry")
        await practiceForm.checkHobbies()
        await practiceForm.addFile()
        await practiceForm.addAddress("First Last ko ghar")
        await practiceForm.clickSubmitBtn()
        await expect(page.locator("//div[@role='dialog']")).toBeVisible()
        await expect(page.locator('//tbody/tr[1]/td[2][text()="First Last"]')).toBeVisible()
    })
})