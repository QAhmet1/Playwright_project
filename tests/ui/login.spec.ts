import { test, expect } from '../support/fixtures';
import { config } from '../support/config';

/**
 * Test suite for The Internet login functionality
 * Tests various login scenarios including valid and invalid credentials
 */
test.describe('The Internet - Login Flow', () => {
  const { username, password } = config.credentials;

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async ({ loginPage, secureAreaPage }) => {
    await loginPage.login(username, password);
    await secureAreaPage.assertLoginSuccess();
  });

  test('should show error message for invalid password', async ({ loginPage }) => {
    await loginPage.login(username, 'wrong-password');
    await loginPage.assertFailurePassword();
  });

  test('should show error message for invalid username', async ({ loginPage }) => {
    await loginPage.login('invalid-user', password);
    await loginPage.assertFailureUsername();
  });

  test('should show error message for empty credentials', async ({ loginPage }) => {
    await loginPage.login('', '');
    await loginPage.assertFlashContainsInvalid();
  });

  test('should redirect to secure area after successful login', async ({ loginPage, secureAreaPage, page }) => {
    await loginPage.login(username, password);
    
    // Verify URL changed to secure area
    await expect(page).toHaveURL(/.*\/secure/);
    await secureAreaPage.assertSecureAreaHeading();
  });
});

