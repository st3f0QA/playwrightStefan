import { APIRequestContext, expect } from '@playwright/test';
import { urls } from "../utils/urls.ts";
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class API{
    private request: APIRequestContext
    constructor(request: APIRequestContext){
        this.request = request;
    }
    async CheckResponseStatus(method: HTTPMethod,endpoint: string, statusCode: number){
        const response = await this.request.fetch(endpoint,{
            method: method,
            ignoreHTTPSErrors: true,
        })
        expect(response.status()).toEqual(statusCode)
    }
    async GetAndCheckHeaders(method: HTTPMethod, endpoint: string, expectedHeaders?: Record<string, string>): Promise<Record<string, string>>{
        const response = await this.request.fetch(endpoint,{
            method: method,
            ignoreHTTPSErrors: true,
        })
        const headers = response.headers();
        console.log(headers)
        if (expectedHeaders) {
            for (const [key, expectedValue] of Object.entries(expectedHeaders)) {
                const actualValue = headers[key.toLowerCase()];
                expect(actualValue).toBeDefined();
                expect(actualValue).toContain(expectedValue);
            }
        }
        return headers  
    }
 }