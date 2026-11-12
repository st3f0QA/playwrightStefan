import { Locator, Page } from '@playwright/test';

export class DragAndDropPage{
    private page: Page
    public redCircle: Locator
    public greenCircle: Locator
    public blueCircle: Locator
    public targetRectangle: Locator
    public squareA: Locator
    public squareB: Locator

    constructor(page:Page){
        this.redCircle = page.locator('.red')
        this.greenCircle = page.locator('.green')
        this.blueCircle = page.locator('.blue')
        this.targetRectangle = page.locator('#target')
        this.squareA = page.locator('#column-a')
        this.squareB = page.locator('#column-b')
    }
    async dragDrop(locator,target) {
        await locator.dragTo(target)
    }
}