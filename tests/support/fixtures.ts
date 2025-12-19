import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/todo.page';
import { LoginPage } from '../pages/login.page';
import { SecureAreaPage } from '../pages/secure-area.page';
import { DemoApiClient } from './apiClient';

type Fixtures = {
  todoPage: TodoPage;
  loginPage: LoginPage;
  secureAreaPage: SecureAreaPage;
  apiClient: DemoApiClient;
};

export const test = base.extend<Fixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await use(todoPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  secureAreaPage: async ({ page }, use) => {
    const secureAreaPage = new SecureAreaPage(page);
    await use(secureAreaPage);
  },
  apiClient: async ({ request }, use) => {
    const client = new DemoApiClient(request);
    await use(client);
  },
});

export const expect = test.expect;

