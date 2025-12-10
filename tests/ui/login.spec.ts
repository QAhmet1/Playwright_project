import { test } from '../support/fixtures';

test.describe('The Internet login flow', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('logs in with valid credentials', async ({ loginPage }) => {
    const user = process.env.LOGIN_USER ?? 'tomsmith';
    const pass = process.env.LOGIN_PASS ?? 'SuperSecretPassword!';
    await loginPage.login(user, pass);
    await loginPage.assertSuccess();
  });

  test('shows validation for invalid credentials', async ({ loginPage }) => {
    const user = process.env.LOGIN_USER ?? 'tomsmith';
    await loginPage.login(user, 'wrong-password');
    await loginPage.assertFailurePassword();
  });
});

