import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DragAndDropPage } from '../pages/DragAndDrop'
import { Scroll } from '../pages/Scroll'
import { API } from '../pages/API';
import { iFrame } from '../pages/iFrame';
import { LoginMultiple } from '../tests/helpers/auth';
type TestFixtures = {
  loginPage: LoginPage;
  dragAndDropPage: DragAndDropPage;
  scrollPage: Scroll;
  apiRequest: API
  iframe: iFrame
  loginMultiple: LoginMultiple
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dragAndDropPage: async({ page },use)=>{
    await use(new DragAndDropPage(page))
  },
  scrollPage: async({ page },use)=>{
    await use(new Scroll(page))
  },
  apiRequest: async({request},use)=>{
    await use (new API(request))
  },
  iframe: async({ page },use)=>{
    await use(new iFrame(page))
  }, 
  loginMultiple: async({page},use)=>{
    await use(new LoginMultiple(page))
  }
  
});
