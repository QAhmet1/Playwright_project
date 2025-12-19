import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { config } from '../support/config';

export class LoginPage extends BasePage {
  private readonly username = this.page.locator('#username');
  private readonly password = this.page.locator('#password');
  private readonly submit = this.page.locator('button[type="submit"]');
  private readonly flash = this.page.locator('#flash');

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto(`${config.urls.base}/login`);
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

  /**
   * Asserts that flash message contains invalid text (for empty credentials)
   */
  async assertFlashContainsInvalid() {
    const flashText = await this.flash.textContent();
    expect(flashText).toContain('invalid');
  }

  /**
   * Asserts that username field is visible (used after logout redirect)
   */
  async assertUsernameFieldVisible() {
    await expect(this.username).toBeVisible();
  }

  /**
   * Asserts that password field is visible (used after logout redirect)
   */
  async assertPasswordFieldVisible() {
    await expect(this.password).toBeVisible();
  }

  /**
   * Asserts that login page is displayed (both fields visible)
   */
  async assertLoginPageDisplayed() {
    await this.assertUsernameFieldVisible();
    await this.assertPasswordFieldVisible();
  }
}

