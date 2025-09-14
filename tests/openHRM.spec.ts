import { test, expect } from '@playwright/test';
import { testData } from '../utils/test-data';


test.describe('Open HRM Login page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    });
    test('The login page loads', async ({ page }) => {
        await expect(page.locator("//h5[text()='Login']")).toBeVisible()
        await expect(page.locator("button[type='submit']")).toBeVisible()
    })
    test('should successfully log in user with valid credentials', async ({ page }) => {
        const usernameField = page.getByPlaceholder("Username")
        const passwordField = page.getByPlaceholder("Password")
        await usernameField.fill(testData.validUser.username)
        await passwordField.fill(testData.validUser.password)
        await page.getByRole('button').filter({ hasText: 'Login' }).click();
        //after login
        await expect(page.locator("//h6[text()='Dashboard']")).toBeVisible()
        await expect(page.locator("//a[contains(@href,'viewAdminModule')]")).toBeVisible()

    })
})