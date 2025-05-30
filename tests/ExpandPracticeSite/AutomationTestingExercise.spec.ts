import { test } from "../../utils/testSetup.ts";
import { expect } from "@playwright/test";
import { urls } from "../../utils/urls.ts";

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
})