import { test, expect } from '@playwright/test';
import { testData } from '../utils/test-data';
import { LoginPage } from '../pages/login.po';
import { PIMOption } from '../pages/pim.page';
import { AddEmployees } from '../pages/addEmployee.page';


test.describe('Orange HRM Login page', () => {
    let loginPage: LoginPage
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.open()
    });
    test('The login page loads', async ({ page }) => {
        await expect(loginPage.username).toBeVisible()
        await expect(loginPage.password).toBeVisible()
        await expect(loginPage.loginBtn).toBeVisible()
    })
    test('should successfully log in user with valid credentials', async ({ page }) => {
        await loginPage.userLogin(testData.validUser.username, testData.validUser.password)
        //after login
        await loginPage.assertLoginSuccess()

    })
    test('should not allow login with invalid credentials', async ({ page }) => {
        await loginPage.userLogin(testData.invalidUser.username, testData.invalidUser.password);
        //after login
        await expect(loginPage.errorMessage).toBeVisible();
    })
    test('should display validation error message for required credentials', async ({ page }) => {
        await loginPage.userLogin("", "");
        await expect(page.locator("//input[contains(@class,'oxd-input--error')]")).toHaveCount(2)
    })
    test('should display validation error message for required username', async ({ page }) => {
        await loginPage.userLogin("", testData.validUser.password);
        await expect(page.locator("//input[contains(@class,'oxd-input--error')]")).toHaveCount(1)
    })
    test('should display validation error message for required password', async ({ page }) => {
        await loginPage.userLogin(testData.validUser.username, "");
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
    let loginPage: LoginPage
    let pimOption: PIMOption
    let addEmployee: AddEmployees
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.open()
        await loginPage.userLogin(testData.validUser.username, testData.validUser.password)
    })
    test('Adding new employee', async ({ page }) => {
        pimOption = new PIMOption(page)
        await pimOption.pimOption.click()
        await expect(pimOption.pimHeader).toBeVisible()
        addEmployee = new AddEmployees(page)
        await addEmployee.addEmployeeBtn.click()
        await expect(page.locator('//h6[text()="Add Employee"]')).toBeVisible()
        const firstName = page.locator("//input[@name='firstName']")
        const middleName = page.locator("//input[@name='middleName']")
        const lastName = page.locator("//input[@name='lastName']")
        const employeeId = page.locator("//label[text()='Employee Id']/following::input[1]")
        const fileChooser = page.waitForEvent('filechooser');
        const imageLoc = page.locator("//div[@class='employee-image-wrapper']")
        await imageLoc.click()
        const fileChoose = await fileChooser
        await fileChoose.setFiles("I:\\testingPresent\\tests\\profile.jpg")
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
    test('Searching newly added employee', async ({ page }) => {
        const employeeList = page.locator("//li/a[text()='Employee List']")
        const empIDsearchfield = page.locator("//label[text()='Employee Id']/following::input[1]")
        const searchBtn = page.locator("//button[@type='submit']")
        const employeeId = "6977"
        const searchResult = page.locator(`//div[@class='oxd-table-card']//div[text()='${employeeId}']`)
        const pimOption = page.locator("//a[contains(@href,'viewPimModule')]")
        await pimOption.click()
        await employeeList.click()
        await empIDsearchfield.fill(employeeId)
        await searchBtn.click()
        await expect(searchResult).toHaveCount(1)
    })
})