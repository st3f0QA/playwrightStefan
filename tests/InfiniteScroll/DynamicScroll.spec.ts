import { test } from "../../utils/testSetup.ts";
import { expect } from "@playwright/test";
import { urls } from "../../utils/urls.ts";

test.describe.configure({retries: 2})

test.describe('Scrape data from infinite scroll',()=>{
    test.beforeEach(async({page})=>{
        await page.context().clearCookies();
    })
    test('Scrape data based on user choice', async({loginPage,scrollPage})=>{
        await loginPage.goto(urls.quotesToScrape)
        await expect(scrollPage.heading).toBeVisible;
        await expect(scrollPage.ScrollForSpecificElement('Logic will get you from A to Z; imagination will get you everywhere.','Albert Einstein')).resolves.toBeTruthy()
    })
})