import browser, { BrowserContext, Locator, Page } from "@playwright/test";
import type { Credentials } from "../tests/types";

export async function login(context: BrowserContext, creds: Credentials): Promise <Page>{
    const page = await context.newPage();
    return page
}
