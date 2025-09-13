import { test, expect } from '@playwright/test';

test.describe('Open HRM Login page', () => {
    test('The login page loads', async ({ page }) => {
        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        await expect(page.locator("//h5[text()='Login']")).toBeVisible()
        await expect(page.locator("button[type='submit']")).toBeVisible()
    })
})