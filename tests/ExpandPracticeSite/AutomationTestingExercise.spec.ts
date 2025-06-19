import { test } from "../../utils/testSetup.ts";
import { chromium, expect } from "@playwright/test";
import { urls } from "../../utils/urls.ts";
import users from '../fixtures/user.json';

test.describe.configure({ retries: 2 }); // retry all tests in this file

test.describe('test exercises site',()=>{
    test.beforeEach(async ({ page }) => {
    // Clear cookies before each test
    await page.context().clearCookies();
});
    test('Go to login page', async({loginPage})=>{
        await loginPage.goto(urls.practiceExpand)
        await loginPage.getToLoginPage()
        await expect(loginPage.LoginHeading).toBeVisible()
        
    })
    test('Check the login with invalid credentials',async({loginPage})=>{
        await loginPage.goto(urls.practiceExpand + '/login')
        await loginPage.signIntoPage('stefan','1234567')
        await expect(loginPage.AlertMessage).toBeVisible()
        await expect(loginPage.AlertMessage).toHaveText('Your username is invalid!')
    })
    test('Check with empty credentials', async({loginPage})=>{
        await loginPage.goto(urls.practiceExpand + '/login')
        await loginPage.signIntoPage('','')
        await expect(loginPage.AlertMessage).toBeVisible()
        await expect(loginPage.AlertMessage).toHaveText('Your username is invalid!')
    })
    test('Successful login with scraped credentials from the page',async({loginPage})=>{
        await loginPage.goto(urls.practiceExpand + '/login')
        const { username, password } = await loginPage.scrapeCredentials();
        await loginPage.signIntoPage(username,password)
        await expect(loginPage.AlertMessage).toBeVisible()
        await expect(loginPage.AlertMessage).toHaveText('You logged into a secure area!')
    })
    test('new method to login multiple', async({loginMultiple,page})=>{
        // Launch a browser
        const browser = await chromium.launch();

        // 2. Create a new browser context
        const contextValid = await browser.newContext();
        await loginMultiple.login(contextValid,users.validUser)
    })
    test('new method for invalid', async({loginMultiple,loginPage})=>{
        // Launch a browser
        const browser = await chromium.launch();

        // 2. Create a new browser context
        const contextValid = await browser.newContext();
        await loginMultiple.login(contextValid,users.invalidUser)
        await expect(loginPage.AlertMessage).toHaveText('Your username is invalid!')
    })
})