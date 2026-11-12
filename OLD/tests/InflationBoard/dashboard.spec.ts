import { test } from "../../utils/testSetup.ts"; 
import { expect} from "@playwright/test";
import { urls } from "../../utils/urls.ts";
import { scrollAndCollectAllCountriesInflation } from '../../pages/InflationBoard'

test.describe.configure({retries: 2})

test.describe('Scrape data from infinite scroll',()=>{
    test.beforeEach(async({page})=>{
        await page.context().clearCookies();
    })
    test('Scrape data and test', async({loginPage, inflationBoard})=>{
        await loginPage.goto(urls.INFLATION_URL)
        // await expect(inflationBoard.mainTable).toBeVisible()
        // console.log(inflationBoard.countryCell)
        const allCountries = await scrollAndCollectAllCountriesInflation(loginPage.page,
        inflationBoard.countryCell,     // countryNameSelector
        inflationBoard.inflationCell,        // inflationSelector
        inflationBoard.tableRow,                     // rowSelector
        inflationBoard.mainTable,      // tableSelector
        14,                       // maxScrolls
        500                       // scrollStep
      );

    //   console.log('All collected countries with inflation:');
    //   console.table(allCountries); // Nicely formatted output
    console.log('Last country:', allCountries)
    //add assertion and change the logic to avoid duplicating entries
    
    })
})