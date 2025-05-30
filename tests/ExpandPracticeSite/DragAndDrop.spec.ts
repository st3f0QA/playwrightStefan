import { test } from "../../utils/testSetup.ts";
import { expect } from "@playwright/test";
import { urls } from "../../utils/urls.ts";

test.describe.configure({ retries: 2 });

test.describe('Check the drag and drop functionality', () => {
    test.beforeEach(async ({ page }) => {
        // Clear cookies before each test
        await page.context().clearCookies();
    });
    test('Drag and drop colors', async ({loginPage,dragAndDropPage})=>{
        await loginPage.goto(urls.practiceExpand+'/drag-and-drop-circles')
        await dragAndDropPage.dragDrop(dragAndDropPage.redCircle,dragAndDropPage.targetRectangle)
        await dragAndDropPage.dragDrop(dragAndDropPage.greenCircle,dragAndDropPage.targetRectangle)
        await dragAndDropPage.dragDrop(dragAndDropPage.blueCircle,dragAndDropPage.targetRectangle)

        await expect(dragAndDropPage.redCircle).toHaveAttribute('style','border: none;')
        await expect(dragAndDropPage.greenCircle).toHaveAttribute('style','border: none;')
        await expect(dragAndDropPage.blueCircle).toHaveAttribute('style','border: none;')
    })
    test('Drag and drop squares', async ({loginPage,dragAndDropPage})=>{
        await loginPage.goto(urls.practiceExpand+'/drag-and-drop')
        await expect(dragAndDropPage.squareA).toHaveText('A')
        await dragAndDropPage.dragDrop(dragAndDropPage.squareA,dragAndDropPage.squareB)
        await expect(dragAndDropPage.squareA).toHaveText('B')
    })
})