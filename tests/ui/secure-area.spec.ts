import { test, expect } from '../support/fixtures';
import { config } from '../support/config';

/**
 * Test suite for The Internet Secure Area functionality
 * Tests various features available after successful login
 */
test.describe('The Internet - Secure Area', () => {
  const { username, password } = config.credentials;

  test.beforeEach(async ({ loginPage, secureAreaPage }) => {
    // Login before each test
    await loginPage.goto();
    await loginPage.login(username, password);
    await secureAreaPage.assertLoginSuccess();
  });

  test('should display secure area heading and welcome message', async ({ secureAreaPage }) => {
    await secureAreaPage.assertSecureAreaHeading();
    await secureAreaPage.assertSubheading();
  });

  test('should successfully logout and redirect to login page', async ({ loginPage, secureAreaPage }) => {
    await secureAreaPage.logout();
    await secureAreaPage.assertLogoutSuccess();
    
    // Verify redirected to login page
    await loginPage.assertLoginPageDisplayed();
  });

  test('should maintain session and display success message', async ({ secureAreaPage }) => {
    const flashMessage = await secureAreaPage.getFlashMessage();
    expect(flashMessage).toContain('You logged into a secure area!');
    expect(flashMessage).toContain('secure area');
  });

  test('should verify secure area content is accessible', async ({ secureAreaPage }) => {
    await secureAreaPage.assertSecureAreaHeading();
    await secureAreaPage.assertLogoutButtonVisible();
    await secureAreaPage.assertSecureContent();
  });
});

