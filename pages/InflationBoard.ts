import {Page, Locator} from 'playwright'

export class InflationBoard{
    public countryCell: Locator
    public inflationCell: Locator
    public tableRow: Locator
    public scrollableTable: Locator
    public mainTable: Locator
    public countryNameColumn: Locator
constructor(page: Page){
    this.mainTable = page.locator('[class="mid-viewport"]')
    this.countryNameColumn = page.locator('[role="gridcell"][column-index="0"]')
    this.countryCell = page.locator('.pivotTableCellWrap.cell-interactive.tablixAlignCenter.main-cell' )    // countryNameSelector
    this.inflationCell = page.locator( '.inflation-cell')        // inflationSelector
    this.tableRow = page.locator('tr')                     // rowSelector
    this.scrollableTable = page.locator('.scrollable-table') 
}
}

export async function scrollAndCollectAllCountriesInflation(
  page: Page,
  countryNameSelector: Locator,
  inflationSelector: Locator,
  rowSelector: Locator,
  tableSelector: Locator,
  maxScrolls = 30,
  scrollStep = 500
): Promise<[]> {
  const collected = [];

  for (let currentScroll = 0; currentScroll < maxScrolls; currentScroll++) {
        console.log(currentScroll)
        const countryCells = await countryNameSelector.elementHandles();

        for (const cell of countryCells) {
            const countryName = (await cell.textContent())?.trim() || '';
            if(countryName !== 'Country' && countryName !== 'Inflation' && countryName !== 'Health' && countryName !== 'Export' && countryName !== 'Import' && countryName !== 'GDP'){
                collected.push(countryName);
            }
        }

    // Scroll the table
        const tableSelectorString = '[class="mid-viewport"]';

    await page.evaluate(
        ({ selector, offset }) => {
            const table = document.querySelector(selector);
            if (table) {
                table.scrollBy(0, offset);
            }
        },
        { selector: tableSelectorString, offset: scrollStep }
    );
    await page.waitForTimeout(1000);
  }
    for(let numbers in collected){
        console.log(collected[numbers])
    } 
return {
  lastEntry: collected[collected.length - 1],
  totalCount: collected.length,
    firstEntry: collected[0]
};

}

// }

