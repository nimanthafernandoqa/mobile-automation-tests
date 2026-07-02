import LoginScreen from '../screens/LoginScreen';
import ProductsScreen from '../screens/ProductsScreen';
import { resetApp, clearCart } from './resetApp';

const VALID_USER   = 'bob@example.com';
const VALID_PASS   = '10203040';
const PRODUCT_NAME = 'Sauce Labs Backpack';

describe('Products Screen', () => {
  let login: LoginScreen;
  let products: ProductsScreen;

  beforeEach(async () => {
    await resetApp();
    login    = new LoginScreen();
    products = new ProductsScreen();
    await login.login(VALID_USER, VALID_PASS);
    await products.assertOnProductsScreen();
    await clearCart();
  });

  it('TC-NEW-04: adding a product updates the cart badge to 1', async () => {
    await products.assertCartEmpty();
    await products.addToCart(PRODUCT_NAME);
    await products.assertCartBadge(1);
  });

  // product screen is the confirmed content-desc of the detail screen container
  it('TC-NEW-05: tapping a product opens the detail screen', async () => {
    await products.openProduct(PRODUCT_NAME);
    await expect(await $('~product screen')).toBeDisplayed();
  });

  // remove item is the confirmed content-desc after adding (lowercase, no "button" suffix)
  it('TC-NEW-06: Add To Cart button becomes Remove after adding', async () => {
    await products.addToCart(PRODUCT_NAME);
    await products.assertCartBadge(1);
    await expect(await $('~remove item')).toBeDisplayed();
  });
});
