import LoginScreen from '../screens/LoginScreen';
import ProductsScreen from '../screens/ProductsScreen';
import { resetApp } from './resetApp';

const VALID_USER = 'bob@example.com';
const VALID_PASS = '10203040';
const BAD_USER   = 'wrong@user.com';
const BAD_PASS   = 'wrongpass';

describe('Login Screen', () => {
  let login: LoginScreen;
  let products: ProductsScreen;

  beforeEach(async () => {
    await resetApp();
    login    = new LoginScreen();
    products = new ProductsScreen();
    await login.assertOnLoginScreen();
  });

  it('TC-NEW-01: valid login navigates to Products screen', async () => {
    await login.login(VALID_USER, VALID_PASS);
    await products.assertOnProductsScreen();
  });

  it('TC-NEW-02: invalid login shows error message', async () => {
    await login.login(BAD_USER, BAD_PASS);
    await login.assertErrorMessage('Username and password do not match');
    await login.assertOnLoginScreen();
  });

  it('TC-NEW-03: user can recover from failed login and try again', async () => {
    await login.login(BAD_USER, BAD_PASS);
    await login.assertErrorMessage('Username and password do not match');
    await login.login(VALID_USER, VALID_PASS);
    await products.assertOnProductsScreen();
  });
});
