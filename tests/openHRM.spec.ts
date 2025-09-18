import { test, expect } from '@playwright/test';
import { testData } from '../utils/test-data';


test.describe('Orange HRM Login page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("web/index.php/auth/login")
    });
    test('The login page loads', async ({ page }) => {
        await expect(page.locator("//h5[text()='Login']")).toBeVisible()
        await expect(page.locator("button[type='submit']")).toBeVisible()
    })
    test('should successfully log in user with valid credentials', async ({ page }) => {
        const usernameField = page.locator("//input[@name='username']")
        const passwordField = page.locator("//input[@name='password']")
        await usernameField.fill(testData.validUser.username)
        await passwordField.fill(testData.validUser.password)
        await page.getByRole('button').filter({ hasText: 'Login' }).click();
        //after login
        await expect(page.locator("//h6[text()='Dashboard']")).toBeVisible()
        await expect(page.locator("//a[contains(@href,'viewAdminModule')]")).toBeVisible()
    })
    test('should not allow login with invalid credentials', async ({ page }) => {
        const usernameField = page.locator("//input[@name='username']")
        const passwordField = page.locator("//input[@name='password']")
        await usernameField.fill(testData.invalidUser.username)
        await passwordField.fill(testData.invalidUser.password)
        await page.getByRole('button').filter({ hasText: 'Login' }).click();
        //after login
        await expect(page.locator("//p[text()='Invalid credentials']")).toBeVisible()
    })
    test('should display validation error message for required credentials', async ({ page }) => {
        const usernameField = page.locator("//input[@name='username']")
        const passwordField = page.locator("//input[@name='password']")
        await usernameField.fill("")
        await passwordField.fill("")
        await page.getByRole('button').filter({ hasText: 'Login' }).click();
        await expect(page.locator("//input[contains(@class,'oxd-input--error')]")).toHaveCount(2)
    })
    test('should display validation error message for required username', async ({ page }) => {
        const usernameField = page.locator("//input[@name='username']")
        const passwordField = page.locator("//input[@name='password']")
        await usernameField.fill("")
        await passwordField.fill(testData.validUser.password)
        await page.getByRole('button').filter({ hasText: 'Login' }).click();
        await expect(page.locator("//input[contains(@class,'oxd-input--error')]")).toHaveCount(1)
    })
    test('should display validation error message for required password', async ({ page }) => {
        const usernameField = page.locator("//input[@name='username']")
        const passwordField = page.locator("//input[@name='password']")
        await usernameField.fill(testData.validUser.username)
        await passwordField.fill("")
        await page.getByRole('button').filter({ hasText: 'Login' }).click();
        await expect(page.locator("//input[contains(@class,'oxd-input--error')]")).toHaveCount(1)
    })

    test('should display form to verify user to change password', async ({ page }) => {
        const forgotPassword = page.locator('//p[contains(@class,"orangehrm-login-forgot-header")]')
        await forgotPassword.click()
        //after click
        await expect(page.locator("//h6[text()='Reset Password']")).toBeVisible()
        await expect(page.locator("//input[@name='username']")).toBeVisible()
        await expect(page.locator("//button[contains(@class,'orangehrm-forgot-password-button--reset')]")).toBeVisible()

    })
})

test.describe('Adding new Employee', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("web/index.php/auth/login")
        const usernameField = page.locator("//input[@name='username']")
        const passwordField = page.locator("//input[@name='password']")
        await usernameField.fill(testData.validUser.username)
        await passwordField.fill(testData.validUser.password)
        await page.getByRole('button').filter({ hasText: 'Login' }).click();
    })
    test('Adding new employee', async ({ page }) => {
        const pimOption = page.locator("//a[contains(@href,'viewPimModule')]")
        await pimOption.click()
        await expect(page.locator("//h6[text()='PIM']")).toBeVisible()
        const addEmployee = page.locator("//li/a[text()='Add Employee']")
        await addEmployee.click()
        await expect(page.locator('//h6[text()="Add Employee"]')).toBeVisible()
        const firstName = page.locator("//input[@name='firstName']")
        const middleName = page.locator("//input[@name='middleName']")
        const lastName = page.locator("//input[@name='lastName']")
        const employeeId = page.locator("//label[text()='Employee Id']/following::input[1]")
        await firstName.fill("First")
        await middleName.fill("Middle")
        await lastName.fill("Last")
        await employeeId.fill("")
        await employeeId.fill("6977")
        const loginToggle = page.locator("//span[contains(@class,'oxd-switch-input')]")
        await loginToggle.click()
        const usernameField = page.locator("//div[contains(@class,'oxd-form-row')][3]//input[contains(@class,'oxd-input')]")
        const passwordField = page.locator("//div[contains(@class,'user-password-row')]//input[contains(@class,'oxd-input--active')]")
        const saveBtn = page.locator("//button[@type='submit']")
        await usernameField.fill("FirstLast65")
        await passwordField.first().fill("firstlast@123")
        await passwordField.last().fill("firstlast@123")
        await saveBtn.click()
        // await expect(page.locator("//label[text()='Username']")).toBeVisible()
        await expect(page.locator("//div[contains(@class,'oxd-toast-content')]//p[text()='Successfully Saved']")).toBeVisible()
    })
})