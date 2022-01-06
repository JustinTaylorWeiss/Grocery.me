// I Justin Weiss R01918238 certify that this submission is my own origional work.
import React from 'react';
import { AuthDataContext } from './auth';
import { useCartData, useFavoriteData } from './cartFavContext';
import { useAuthData } from './auth';
import './App.css';

import { SplashScreen } from './splashScreen';
import { Shop } from './shop';
import { Login } from './login';
import { SignUp } from './signUp';
import { ProductPage } from './productPage';
import { Cart } from './cart';
import { Checkout } from './checkout';
import { OrderConfirmation } from './orderConfirmation';

function App() {
  const [page, updatePage] = React.useState("Splash");
  const [currentID, updateCurrentID] = React.useState(0);
  const cartDataState = useCartData();
  const [cart, updateCart] = cartDataState;
  const cartFavoriteState = useFavoriteData();
  const [favorites, updateFavorites] = cartFavoriteState;
  const appDataState = useAuthData();

  return <AuthDataContext.Provider value={appDataState}>
    <div className="App">
      {
        page === "Shop"?
        <Shop
            updatePage={updatePage}
            cart={cart}
            updateCart={updateCart}
            favorites={favorites}
            updateFavorites={updateFavorites}
        /> :
        /^Product-/.test(page) ?
        <ProductPage
            itemID={/^Product-(?<id>\d+)/.exec(page).groups.id}
            updatePage={updatePage}
            cart={cart}
            updateCart={updateCart}
            favorites={favorites}
            updateFavorites={updateFavorites}
        /> :
        page === "Cart" ?
        <Cart
            updatePage={updatePage}
            cart={cart}
            updateCart={updateCart}
            favorites={favorites}
            updateFavorites={updateFavorites}
        /> :
        page === "Checkout" ?
        <Checkout
            updatePage={updatePage}
            cart={cart}
            updateCart={updateCart}
            favorites={favorites}
            updateFavorites={updateFavorites}
        /> :
        page === "orderConfirmation" ?
        <OrderConfirmation
            updatePage={updatePage}
            cart={cart}
            updateCart={updateCart}
            favorites={favorites}
            updateFavorites={updateFavorites}
        /> :
        page === "Login" ?
        <Login
            updatePage={updatePage}
            cart={cart}
            favorites={favorites}
            updateFavorites={updateFavorites}
        /> :
        page === "SignUp" ?
        <SignUp
            updatePage={updatePage}
            cart={cart}
            favorites={favorites}
            updateFavorites={updateFavorites}
        /> :
        page === "Splash" ?
        <SplashScreen
            updatePage={updatePage}
            favorites={favorites}
            updateFavorites={updateFavorites}
        /> :
        null
      }
    </div>
  </AuthDataContext.Provider>;
}

export default App;
