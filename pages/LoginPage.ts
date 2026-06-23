// =====================================================
// PAGE OBJECT — Login Page
//
// This class represents the login page of the app.
// It contains:
//   - The URL of the page
//   - All the element locators (buttons, fields)
//   - All the actions a user can do on this page
//
// RULE: No test logic here — only page interactions.
// If an element ID changes, fix it HERE only.
// All tests automatically get the fix.
// =====================================================

import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {

  // The URL of this specific page
  readonly url = '/practice-test-login/';

  // The Playwright page object — controls the browser
  readonly page: Page;

  // -----------------------------------------------
  // ELEMENT LOCATORS
  // These point to the actual elements on the page
  // -----------------------------------------------
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton:   Locator;
  readonly errorMessage:  Locator;

  constructor(page: Page) {
    this.page = page;

    // Each locator finds an element on the page
    // '#username' means: find the element with id="username"
    this.usernameField = page.locator('#username');
    this.passwordField = page.locator('#password');
    this.loginButton   = page.locator('#submit');
    this.errorMessage  = page.locator('#error');
  }

  // -----------------------------------------------
  // PAGE ACTIONS
  // These are things a user can do on this page
  // -----------------------------------------------

  /** Navigate the browser to the login page */
  async open(): Promise<void> {
    await this.page.goto(this.url);
  }

  /** Type a username into the username field */
  async enterUsername(username: string): Promise<void> {
    await this.usernameField.fill(username);
  }

  /** Type a password into the password field */
  async enterPassword(password: string): Promise<void> {
    await this.passwordField.fill(password);
  }

  /** Click the Login button */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Full login action in one call.
   * Fills username, fills password, clicks login.
   * Used in most tests to keep them short and readable.
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  // -----------------------------------------------
  // PAGE ASSERTIONS
  // These check that the page looks correct
  // -----------------------------------------------

  /** Assert that the error message is visible on screen */
  async errorShouldBeVisible(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }

  /** Assert that the error message contains specific text */
  async errorShouldContain(text: string): Promise<void> {
    await expect(this.errorMessage).toContainText(text);
  }

  /** Assert that the password field is masked (type="password") */
  async passwordFieldShouldBeMasked(): Promise<void> {
    await expect(this.passwordField).toHaveAttribute('type', 'password');
  }
}
