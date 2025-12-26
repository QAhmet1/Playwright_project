import { askAI } from "../support/aiClient";
import { test, expect } from "../support/fixtures";
import { saveAiTestCode } from "../support/saveAiTests";
import * as dotenv from "dotenv";
dotenv.config();

test.describe("AI‑Powered Login Test Generator", () => {
  const username = "lilitol997@bllibl.com";
  const password = "Tester01";

  test("AI: Generate REAL Playwright login test code", async ({ page }) => {
    await page.goto("https://automationexercise.com/login");

    // Close cookie popup
    await page.locator("button:has-text('Consent')")
      .click({ timeout: 5000 })
      .catch(() => {});

    // Extract login form HTML
    const loginForm = page.locator('form:has(input[data-qa="login-email"])');
    const loginFormHtml = await loginForm.innerHTML();

    // Ask AI to generate test
    const generatedTest = await askAI(`
      You are a Senior QA Automation Engineer.
      Generate a FULL Playwright test (TypeScript) for the login page below.

      Requirements:
      - Use ONLY elements that exist in the HTML.
      - Do NOT invent locators.
      - Use the provided credentials.
      - Include navigation, input actions, assertions, and error handling.
      - Use expect() assertions.
      - Use page.locator() with stable selectors.
      - Verify successful login OR correct error message.

      Credentials:
      username: ${username}
      password: ${password}

      LOGIN FORM HTML:
      ${loginFormHtml}

      Output ONLY valid Playwright test code.
    `);

    console.log("\n🧠 AI Generated Playwright Test Code:\n");
    console.log(generatedTest);

    // Save AI test to .spec.ts file
    // saveAiTestCode(generatedTest!);
  });
});
