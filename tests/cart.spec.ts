import LoginScreen from '../screens/LoginScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';
import { resetApp, clearCart } from './resetApp';

const VALID_USER   = 'bob@example.com';
const VALID_PASS   = '10203040';
const PRODUCT_NAME = 'Sauce Labs Backpack';

describe('Cart Screen', () => {
  let login: LoginScreen;
  let products: ProductsScreen;
  let cart: CartScreen;

  beforeEach(async () => {
    await resetApp();
    login    = new LoginScreen();
    products = new ProductsScreen();
    cart     = new CartScreen();
    await login.login(VALID_USER, VALID_PASS);
    await products.assertOnProductsScreen();
    await clearCart();
    await products.addToCart(PRODUCT_NAME);
    await products.assertCartBadge(1);
    await products.goToCart();
    await cart.assertOnCartScreen();
  });

  it('TC-NEW-07: added item appears in cart with Checkout button', async () => {
    await cart.assertItemInCart(PRODUCT_NAME);
    await cart.assertCheckoutButtonVisible();
  });

  it('TC-NEW-08: removing the only item leaves the cart empty', async () => {
    await cart.removeItem(PRODUCT_NAME);
    await cart.assertCartIsEmpty();
  });

  it('TC-NEW-09: Continue Shopping returns to Products with badge intact', async () => {
    await cart.continueShopping();
    await products.assertOnProductsScreen();
    await products.assertCartBadge(1);
  });
});
