import {Page, Frame, Locator} from 'playwright'

export class iFrame{
    readonly page: Page
    readonly iFrameLocator: Locator

    constructor (page: Page){
        this.page = page
        this.iFrameLocator = page.locator('iframe[title="W3Schools HTML Tutorial"]')
    }
    async getFrame(locator){
        const handleIframeElement = await locator.elementHandle()
        if (!handleIframeElement) throw new Error ('Iframe element not found!')

        const frame = await handleIframeElement.contentFrame()
        if (!frame) throw new Error ('Frame not found!')
        return frame
    }
    async clickOnMap(){
        const frame = await this.getFrame(this.iFrameLocator)
        await frame.waitForSelector('#pagetop')
        await frame.click('#pagetop')
    }
}