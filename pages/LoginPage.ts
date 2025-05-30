import { Locator, Page } from '@playwright/test';

export class LoginPage{
    private page: Page
    private usernameField: Locator
    private passwordField: Locator
    private alertMessage: Locator
    private scrapedPasswordLocator: Locator
    private scrapedUsernameLocator: Locator

    constructor(page: Page){
        this.page = page
        this.usernameField = page.locator('#username')
        this.passwordField = page.locator('#password')
        this.alertMessage = page.locator("#flash-message")
        this.scrapedUsernameLocator = page.locator('li',{hasText: 'Username:'}).locator('b')
        this.scrapedPasswordLocator = page.locator('li',{hasText: 'Password:'}).locator('b')
    }
    async goto(url: string){
        await this.page.goto(url)
    }
    async getToLoginPage(){
        await this.page.getByText('Test Login Page').first().click()
    }
    async signIntoPage(username:string,password:string){
        await this.usernameField.fill(username)
        await this.passwordField.fill(password)
        await this.page.getByRole('button',{name:'Login'}).click()
    }
    async scrapeCredentials(){
        const scrapedUsername = (await this.scrapedUsernameLocator.textContent())?.trim()
        const scrapedPassword = (await this.scrapedPasswordLocator.textContent())?.trim()
        return {
        username: scrapedUsername?.trim() ?? '',
        password: scrapedPassword?.trim() ?? ''
    };

    }

    //getters
    get LoginHeading(): Locator {
        return this.page.getByRole('heading', {
            name: 'Test Login page for Automation Testing Practice',
        });
    }
    get AlertMessage(): Locator {
        return this.alertMessage
    }
    
    
}