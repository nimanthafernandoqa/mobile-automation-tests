import BaseScreen from './BaseScreen';

export default class LoginScreen extends BaseScreen {
  private readonly IDS = {
    username: 'Username input field',
    password: 'Password input field',
    loginBtn: 'Login button',
    errorMsg: 'generic-error-message',
  } as const;

  async login(username: string, password: string): Promise<void> {
    await this.typeInto(this.IDS.username, username);
    await this.typeInto(this.IDS.password, password);
    await this.tap(this.IDS.loginBtn);
    // Give the app time to process login and navigate
    await browser.pause(3000);
  }

  async assertOnLoginScreen(): Promise<void> {
    await this.assertVisible(this.IDS.username);
  }

  async assertErrorMessage(expectedText: string): Promise<void> {
    // Wait for the error message container to appear
    await $('~generic-error-message').waitForDisplayed({ timeout: 10000 });
    await browser.pause(500);
    // The container may be a ViewGroup with empty .getText() — use page source instead
    const src = await browser.getPageSource();
    if (!src.includes(expectedText)) {
      // Find the snippet near the error element for a useful error message
      const idx = src.indexOf('generic-error-message');
      const snippet = idx >= 0 ? src.substring(idx, idx + 300) : '(not found)';
      throw new Error(
        `Expected error message to contain "${expectedText}". Snippet: ${snippet}`
      );
    }
  }
}
