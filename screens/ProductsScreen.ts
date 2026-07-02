import BaseScreen from './BaseScreen';

export default class ProductsScreen extends BaseScreen {
  private readonly IDS = {
    screen: 'products screen',
    cartBadge: 'cart badge',
  } as const;

  async openProduct(productName: string): Promise<void> {
    await $(`//*[@text="${productName}"]`).click();
    await browser.pause(2000);
  }

  async addToCart(productName: string): Promise<void> {
    await this.openProduct(productName);
    await browser.pause(1000);
    await $('~Add To Cart button').click();
    await browser.pause(5000);
  }

  async goToCart(): Promise<void> { await this.tap(this.IDS.cartBadge); }

  async assertOnProductsScreen(): Promise<void> {
    // Use 60 s timeout — navigation can be slow after multiple mid-session logins
    await $('~products screen').waitForDisplayed({ timeout: 60000 });
  }

  async assertCartBadge(expected: number): Promise<void> {
    await $('~cart badge').waitForDisplayed({ timeout: 15000 });
    for (let i = 0; i < 30; i++) {
      const text = await $('~cart badge').getText();
      if (Number(text) === expected) return;
      await browser.pause(500);
    }
    const actual = await $('~cart badge').getText();
    throw new Error(`cart badge: expected ${expected}, got ${actual}`);
  }

  async assertCartEmpty(): Promise<void> { await this.assertNotVisible(this.IDS.cartBadge); }
}
