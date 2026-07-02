import BaseScreen from './BaseScreen';

/**
 * IDs confirmed from BrowserStack Build 12 page source:
 *   cart screen              — main cart container
 *   Proceed To Checkout button — primary CTA
 *   remove item              — per-item remove (lowercase, no "button" suffix)
 */
export default class CartScreen extends BaseScreen {
  private readonly IDS = {
    screen:      'cart screen',
    checkoutBtn: 'Proceed To Checkout button',
    removeBtn:   'remove item',
  } as const;

  async assertOnCartScreen(): Promise<void> {
    await this.assertVisible(this.IDS.screen);
  }

  async assertItemInCart(productName: string): Promise<void> {
    await expect(await $(`//*[@text="${productName}"]`)).toBeDisplayed();
  }

  async assertCheckoutButtonVisible(): Promise<void> {
    await this.assertVisible(this.IDS.checkoutBtn);
  }

  async removeItem(_productName: string): Promise<void> {
    await this.tap(this.IDS.removeBtn);
    await browser.pause(1000);
  }

  async assertCartIsEmpty(): Promise<void> {
    await this.assertNotVisible(this.IDS.removeBtn);
  }

  async continueShopping(): Promise<void> {
    await $('//*[@text="Continue Shopping"]').click();
    await browser.pause(2000);
  }
}
