import React from 'react';
import './App.css';

import { SplashScreen } from './splashScreen';
import { Shop } from './shop';
import { Login } from './login';
import { SignUp } from './signUp';

function App() {

  const [page, updatePage] = React.useState("Splash");
  const [cart, updateCart] = React.useState([]);

  return <>
    <div className="App">
      {
        page === "Shop"   ?
        <Shop
            updatePage={updatePage}
            cart={cart}
            updateCart={updateCart}
        /> :
        page === "Splash" ? <SplashScreen updatePage={updatePage}/> :
        page === "Login"  ? <Login updatePage={updatePage}/>        :
        page === "SignUp" ? <SignUp updatePage={updatePage}/>       :
        <null/>
      }
    </div>
  </>;
}

export default App;
