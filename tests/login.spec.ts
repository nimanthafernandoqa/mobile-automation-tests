// =====================================================
// LOGIN TESTS
//
// These are the actual test cases for the login page.
//
// RULE: No element locators in here.
//       No page URLs in here.
//       Only test logic — using the Page Objects.
//
// This file answers the question:
//   "What should the login page DO?"
// =====================================================

import { test, expect } from '@playwright/test';
import { LoginPage }   from '../pages/LoginPage';
import { SuccessPage } from '../pages/SuccessPage';


// =====================================================
// GROUP 1 — Valid Login Tests
// What happens when credentials are correct
// =====================================================

test.describe('Valid Login', () => {

  test('TC01 — valid credentials navigate to success page', async ({ page }) => {
    const login   = new LoginPage(page);
    const success = new SuccessPage(page);

    await login.open();
    await login.login('student', 'Password123');

    await success.shouldBeOnSuccessPage();
    await success.headingShouldConfirmLogin();
  });

  test('TC02 — valid login shows logout button', async ({ page }) => {
    const login   = new LoginPage(page);
    const success = new SuccessPage(page);

    await login.open();
    await login.login('student', 'Password123');

    await success.logoutButtonShouldBeVisible();
  });

  test('TC03 — valid login shows success message', async ({ page }) => {
    const login   = new LoginPage(page);
    const success = new SuccessPage(page);

    await login.open();
    await login.login('student', 'Password123');

    await success.successMessageShouldBeVisible();
  });

});


// =====================================================
// GROUP 2 — Invalid Login Tests
// What happens when credentials are wrong
// =====================================================

test.describe('Invalid Login', () => {

  test('TC04 — wrong password shows error message', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();
    await login.login('student', 'wrongpassword');

    await login.errorShouldBeVisible();
    await login.errorShouldContain('Your password is invalid!');
  });

  test('TC05 — wrong username shows error message', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();
    await login.login('wronguser', 'Password123');

    await login.errorShouldBeVisible();
    await login.errorShouldContain('Your username is invalid!');
  });

  test('TC06 — wrong username and password shows error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();
    await login.login('wronguser', 'wrongpassword');

    await login.errorShouldBeVisible();
  });

});


// =====================================================
// GROUP 3 — Empty Field Tests
// What happens when fields are left blank
// =====================================================

test.describe('Empty Fields', () => {

  test('TC07 — empty username shows error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();
    await login.login('', 'Password123');

    await login.errorShouldBeVisible();
  });

  test('TC08 — empty password shows error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();
    await login.login('student', '');

    await login.errorShouldBeVisible();
  });

  test('TC09 — both fields empty shows error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();
    await login.login('', '');

    await login.errorShouldBeVisible();
  });

});


// =====================================================
// GROUP 4 — Security Tests
// What happens with malicious or unexpected input
// =====================================================

test.describe('Security', () => {

  test('TC10 — SQL injection does not crash the app', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();
    await login.login("' OR 1=1--", 'anything');

    // App should show an error — not crash or expose data
    await login.errorShouldBeVisible();
  });

  test('TC11 — password field is masked', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();

    // Password should never be visible as plain text
    await login.passwordFieldShouldBeMasked();
  });

  test('TC12 — XSS attack does not crash the app', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();
    await login.login('<script>alert("xss")</script>', 'anything');

    // App should show an error — not execute the script
    await login.errorShouldBeVisible();
  });

});


// =====================================================
// GROUP 5 — Page Content Tests
// What the page looks like and contains
// =====================================================

test.describe('Page Content', () => {

    test('TC13 — login page has correct browser title', async ({ page }) => {
        const login = new LoginPage(page);
        await login.open();
        await expect(page).toHaveTitle(/Test Login/);
      });

  test('TC14 — login button is visible on page load', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();

    await expect(login.loginButton).toBeVisible();
  });

  test('TC15 — username and password fields are visible on load', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();

    await expect(login.usernameField).toBeVisible();
    await expect(login.passwordField).toBeVisible();
  });

});
