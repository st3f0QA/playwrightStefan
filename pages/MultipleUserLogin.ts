import { BrowserContext, Page } from "@playwright/test";

interface Credentials {
    username: string;
    password: string;
}
export async function login(context: BrowserContext, creds: Credentials): Promise <Page>{
    const page = await context.newPage();
        
    return page
}
