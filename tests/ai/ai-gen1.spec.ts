import { test, expect } from '@playwright/test';

test.describe('sdg', () => {

  test.beforeEach(async ({ page }) => {
      // Navigate to the login page
  
    await page.goto('https://automationexercise.com/login');
    

    // Close cookie popup
    await page.locator("button:has-text('Consent')")
      .click({ timeout: 5000 })
      .catch(() => {});
    });
  
  test('Login test with valid credentials', async ({ page }) => {


  // Input the email address
  await page.fill('input[data-qa="login-email"]', 'lilitol997@bllibl.com');

  // Input the password
  await page.fill('input[data-qa="login-password"]', 'Tester01');

  // Click the login button
  await page.click('button[data-qa="login-button"]');

  // Wait for navigation after login
  await page.waitForLoadState('networkidle');

  // Assertion to check for successful login (example: user dashboard or a specific element that appears only after login)
  const logout = 'text=logout'; // Replace with the actual selector of an element that appears only after login
    await expect(page.locator(logout)).toBeVisible();
    
    // logout
    await page.click(logout)
  
  // In case of failure from login, check for error message (optional based on application behavior)
});

test('Login test with invalid credentials', async ({ page }) => {

  // Input the email address
  await page.fill('input[data-qa="login-email"]', 'wrong_email@example.com');

  // Input the password
  await page.fill('input[data-qa="login-password"]', 'wrongpassword');

  // Click the login button
  await page.click('button[data-qa="login-button"]');

  // Wait for the error message to appear
  const errorMessageSelector = "text=Your email or password is incorrect!"; // Replace with the selector of your error message element
  await expect(page.locator(errorMessageSelector)).toBeVisible();

  // Assertion to check for the correct error message
  await expect(page.locator(errorMessageSelector)).toHaveText('Your email or password is incorrect!'); // Replace with the actual expected error message
});
})
