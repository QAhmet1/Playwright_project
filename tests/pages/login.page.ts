import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private readonly username = this.page.locator('#username');
  private readonly password = this.page.locator('#password');
  private readonly submit = this.page.locator('button[type="submit"]');
  private readonly flash = this.page.locator('#flash');

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    const baseUrl = process.env.BASE_URL_LOGIN || 'https://the-internet.herokuapp.com/login';
    await this.page.goto(baseUrl);
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }

  async assertSuccess() {
    await expect(this.flash).toContainText('You logged into a secure area!');
  }

  async assertFailureUsername() {
    await expect(this.flash).toContainText('Your username is invalid!');
  }

  async assertFailurePassword() {
    await expect(this.flash).toContainText('Your password is invalid!');
  }
}

