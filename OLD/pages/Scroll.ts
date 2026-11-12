import { Locator, Page } from '@playwright/test';
export class Scroll{
    private page: Page
    public heading: Locator
    private authorLocator: Locator

    constructor(page: Page){
        this.page = page
        this.heading = this.page.getByText('Quotes to Scrape')
        this.authorLocator = this.page.locator('.author')
    }
    async ScrollForSpecificElement(specificText: string,expectedAuthor: string):Promise<boolean>{
        for (var i = 0; i <=5000; i+=100){
            const locator = this.page.getByText(specificText)
            
            if (await locator.isVisible()) {
                const quoteLocator = this.page.getByText(specificText).locator('..')   
                const authorLocator = quoteLocator.locator('.author');
                const authorText = await authorLocator.textContent();      

                console.log(`Found: "${specificText}" at scroll position ${i}`);
                console.log(`This is the author:"${authorText}"`)
                return true
            }
            else{
                await this.page.mouse.wheel(0,100)
            }
        }
        console.warn(`❌ Text "${specificText}" not found after scrolling.`);
        return false;
    }
}