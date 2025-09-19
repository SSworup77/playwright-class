import { Locator, Page } from "@playwright/test"
import path from "path"

class PracticeForm {
    readonly page: Page
    readonly firstName: Locator
    readonly lastName: Locator
    readonly email: Locator
    readonly maleRadio: Locator
    readonly mobileNumber: Locator
    readonly dob: Locator
    readonly subject: Locator
    readonly hobbies: Locator
    readonly address: Locator
    readonly state: Locator
    readonly state2: Locator
    readonly city: Locator
    readonly city2: Locator
    readonly submitBtn: Locator
    constructor(page: Page) {
        this.page = page
        this.firstName = page.locator("#firstName")
        this.lastName = page.locator("#lastName")
        this.email = page.locator("#userEmail")
        this.maleRadio = page.locator("//label[text()='Male']")
        this.mobileNumber = page.locator("#userNumber")
        this.dob = page.locator("#dateOfBirthInput")
        this.subject = page.locator("#subjectsInput")
        this.hobbies = page.locator("//label[text()='Sports']")
        this.address = page.locator("#currentAddress")
        this.state = page.locator("#state")
        this.state2 = page.locator("//div[text()='Haryana']")
        this.city = page.locator("#city")
        this.city2 = page.locator("//div[text()='Panipat']")
        this.submitBtn = page.locator("//button[@type='submit']")
    }
    async userInfo(firstName: string, lastName: string, email: string, mobileNumber: string, dob: string) {
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.email.fill(email)
        await this.maleRadio.check();
        await this.mobileNumber.fill(mobileNumber)
        await this.dob.fill(dob)
        await this.page.keyboard.press("Enter")
    }
    async subjectInfo(subject1: string, subject2: string) {
        await this.subject.fill(subject1)
        await this.page.keyboard.press("Enter")
        await this.subject.fill(subject2)
        await this.page.keyboard.press("Enter")
    }
    async checkHobbies() {
        await this.hobbies.check()
    }
    async addFile() {
        await this.page.getByLabel('Select picture').setInputFiles(path.join(__dirname, 'image.png'));
    }
    async addAddress(address: string) {
        await this.address.fill(address)
        await this.state.click()
        await this.state2.click()
        await this.city.click()
        await this.city2.click()
    }
    async clickSubmitBtn(){
        await this.submitBtn.click()
    }
}


export { PracticeForm }