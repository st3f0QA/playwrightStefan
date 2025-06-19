import { BrowserContext, Locator, Page } from "@playwright/test";
import { urls } from "../../utils/urls";

interface Credentials {
    username: string;
    password: string;
}
export class LoginMultiple{
    usernameField: Locator
    passwordField: Locator
    constructor(private page: Page){
        this.usernameField = page.locator('#username')
        this.passwordField = page.locator('#password')
    }
  
    async goto(url: string){
        await this.page.goto(url)
    }
    async  getToLoginPage(){
        await this.page.getByText('Test Login Page').first().click()
    }
    async signIntoPage(username:string,password:string){
        await this.usernameField.fill(username)
        await this.passwordField.fill(password)
        await this.page.getByRole('button',{name:'Login'}).click()
    }
    async login(context: BrowserContext, creds: Credentials): Promise <Page>{
        const page = await context.newPage();
        await this.goto(urls.practiceExpand + '/login')
        await this.signIntoPage(creds.username,creds.password)
        return page
    }
}
