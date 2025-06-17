import { test } from "../../utils/testSetup";
import { urls } from "../../utils/urls";

test.describe('Test with iframe',()=>{
    test.beforeEach(async({page})=>{
        await page.context().clearCookies();
    })
    test('Test W3School iframe', async({page,iframe})=>{
        await page.goto(urls.w3school+'html/html_iframe.asp')
        await iframe.clickOnMap()
        await page.waitForTimeout(10000)
    })
})