// =====================================================
// PAGE OBJECT — Success Page
//
// This is the page a user lands on after
// a successful login.
//
// As your app grows, add more pages like this:
//   ProfilePage.ts, HomePage.ts, SettingsPage.ts
// =====================================================

import { Page, Locator, expect } from '@playwright/test';

export class SuccessPage {

  readonly url = '/logged-in-successfully/';

  readonly page:         Page;
  readonly heading:      Locator;
  readonly logoutButton: Locator;
  readonly successText:  Locator;

  constructor(page: Page) {
    this.page         = page;
    this.heading      = page.locator('h1');
    this.logoutButton = page.locator('a', { hasText: 'Log out' });
    this.successText  = page.locator('.post-content p').first();
  }

  // -----------------------------------------------
  // PAGE ASSERTIONS
  // -----------------------------------------------

  /** Assert we are on the success page */
  async shouldBeOnSuccessPage(): Promise<void> {
    await expect(this.page).toHaveURL(/logged-in-successfully/);
  }

  /** Assert the heading says Logged In Successfully */
  async headingShouldConfirmLogin(): Promise<void> {
    await expect(this.heading).toContainText('Logged In Successfully');
  }

  /** Assert the logout button is visible */
  async logoutButtonShouldBeVisible(): Promise<void> {
    await expect(this.logoutButton).toBeVisible();
  }

  /** Assert the congratulations message is visible */
  async successMessageShouldBeVisible(): Promise<void> {
    await expect(this.successText).toBeVisible();
  }
}
