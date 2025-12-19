import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { config } from '../support/config';

/**
 * Page Object Model for The Internet Secure Area page
 * Represents the secure area accessed after successful login
 */
export class SecureAreaPage extends BasePage {
  private readonly flashMessage = this.page.locator('#flash');
  private readonly logoutButton = this.page.locator('a.button.secondary');
  private readonly heading = this.page.locator('h2');
  private readonly subheading = this.page.locator('h4.subheader');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigates to the secure area page
   */
  async goto() {
    await this.page.goto(`${config.urls.base}/secure`);
  }

  /**
   * Asserts that the user is successfully logged in
   */
  async assertLoginSuccess() {
    await expect(this.flashMessage).toContainText('You logged into a secure area!');
    await expect(this.heading).toHaveText('Secure Area');
  }

  /**
   * Clicks the logout button
   */
  async logout() {
    await this.logoutButton.click();
  }

  /**
   * Asserts that logout was successful
   */
  async assertLogoutSuccess() {
    await expect(this.flashMessage).toContainText('You logged out of the secure area!');
  }

  /**
   * Gets the flash message text
   */
  async getFlashMessage(): Promise<string> {
    return await this.flashMessage.textContent() || '';
  }

  /**
   * Asserts the secure area heading is visible
   */
  async assertSecureAreaHeading() {
    await expect(this.heading).toBeVisible();
    await expect(this.heading).toHaveText('Secure Area');
  }

  /**
   * Asserts the subheading is visible and contains expected content
   */
  async assertSubheading() {
    await expect(this.subheading).toBeVisible();
    await expect(this.subheading).toContainText('Welcome to the Secure Area');
  }

  /**
   * Asserts that logout button is visible and enabled
   */
  async assertLogoutButtonVisible() {
    await expect(this.logoutButton).toBeVisible();
    await expect(this.logoutButton).toBeEnabled();
  }

  /**
   * Gets the page body text content
   */
  async getBodyTextContent(): Promise<string> {
    return await this.page.textContent('body') || '';
  }

  /**
   * Asserts that page contains expected secure content
   */
  async assertSecureContent() {
    const pageContent = await this.getBodyTextContent();
    expect(pageContent).toContain('Secure Area');
    expect(pageContent).toContain('Welcome to the Secure Area');
  }
}

