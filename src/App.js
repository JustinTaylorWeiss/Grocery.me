import React from 'react';
import './App.css';

import { SplashScreen } from './splashScreen';
import { Shop } from './shop';

function App() {

  const [page, updatePage] = React.useState("Splash");

  return <>
    <div className="App">
      {
        page === "Splash" ? <SplashScreen updatePage={updatePage}/> :
        page === "Shop"   ? <Shop updatePage={updatePage}/>         :
        <null/>
      }
    </div>
  </>;
}

export default App;
