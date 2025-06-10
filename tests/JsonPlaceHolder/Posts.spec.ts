import { test } from "../../utils/testSetup.ts";
import { urls } from "../../utils/urls.ts";

let expectedHeaders = {
  'content-type': 'application/json',
  'cache-control': 'max-age=43200',
  'Content-Encoding': 'gzip',
  'Pragma': 'no-cache'
}
test.describe('JsonPlaceHolder tests for Posts',()=>{
    test('First test - check response code',async ({apiRequest})=>{
        await apiRequest.CheckResponseStatus('GET', urls.jsonPlaceHolderURL+'posts',200)
    })
    test('Second test - Check some headers',async({apiRequest})=>{
        await apiRequest.GetAndCheckHeaders('GET',urls.jsonPlaceHolderURL+'posts',expectedHeaders)
    })
})