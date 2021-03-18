import React from 'react';
import './App.css';

import { SplashScreen } from './splashScreen';
import { Shop } from './shop';
import { Login } from './login';
import { SignUp } from './signUp';
import { ProductPage } from './productPage';
import { Cart } from './cart';

function App() {

  const [page, updatePage] = React.useState("Splash");
  const [currentID, updateCurrentID] = React.useState(0);
  const [cart, updateCart] = React.useState([]);

  return <>
    <div className="App">
      {
        page === "Shop" ?
        <Shop
            updatePage={updatePage}
            cart={cart}
            updateCart={updateCart}
        /> :
        /^Product-/.test(page) ?
        <ProductPage
            itemID={page.slice(8)}
            updatePage={updatePage}
            cart={cart}
            updateCart={updateCart}
        /> :
        page === "Cart" ?
        <Cart
            updatePage={updatePage}
            cart={cart}
            updateCart={updateCart}
        /> :
        page === "Login"  ? <Login updatePage={updatePage} cart={cart}/>  :
        page === "SignUp" ? <SignUp updatePage={updatePage} cart={cart}/> :
        page === "Splash" ? <SplashScreen updatePage={updatePage}/>       :
        <null/>
      }
    </div>
  </>;
}

export default App;
