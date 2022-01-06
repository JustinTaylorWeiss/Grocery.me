// I Justin Weiss R01918238 certify that this submission is my own origional work.
import React from 'react';
import hamburgerIcon from './assets/hamburger.svg';
import homeIcon from './assets/homeIcon.svg';
import pinIcon from './assets/pin.svg';
import shoppingCart from './assets/shoppingCart.svg';
import { itemDB } from '../LocalDB/itemDB';

import { HamburgerMenu } from '../hamburgerMenu';
import { AuthDataContext } from '../auth';

export const NavBar = ({fullWidth, updatePage, cart, favorites, updateFavorites, updateActiveItems}) => {

    const [hamburger, updateHamburger] = React.useState(false);
    const [firstLoad, updateFirstLoad] = React.useState(true);
    const [totalActiveItems, updateTotalActiveItems] = React.useState([1,2,3,4,5,6,7,8]);
    const [appData, updateAppData] = React.useContext(AuthDataContext);
    const [location, updateLocation] = React.useState("error");

    const hamburgerHomeClass = fullWidth ? "hamburgerHomeWrapperFull" : "hamburgerHomeWrapper"
    const signUpClass = fullWidth ? "signUpFull" : "signUp";
    const signOutClass = fullWidth ? "signOutFull" : "signOut";
    const navBarClass = fullWidth ? "navBarFull" : "navBar";

    React.useEffect(() => {
      const tempLocation = localStorage.getItem('location');
      if (tempLocation)
        updateLocation(tempLocation);
      else
        updateLocation(null);
    },[])

    const signOutOnClick = () => {
      localStorage.setItem("authData", "");
      localStorage.setItem("location", "");
      localStorage.setItem("paymentData", []);
      localStorage.setItem("cart", []);
      localStorage.setItem("favorites", []);
      window.location.reload();
    }

    const hamburgerOnClick = () => {
        updateFirstLoad(false);
        updateHamburger(!hamburger);
    }

    const displayName = appData?.user?.displayName ?? "";
    const email = appData?.user?.email ?? "";
    const outputName = displayName ?
      displayName :
      email ?
        email :
        "User #32145";



    const cartCount = fullWidth ? cart.reduce((a, e) => a+(e[1]*1), 0) : 0;

    const search = () => {
        if(updateActiveItems) {
          const searchParameter = document.getElementById("searchBar").value.toLowerCase()
          const filteredList = totalActiveItems.filter((itemID, index) => (
            itemDB.names[itemID].toLowerCase().includes(searchParameter)
          ))
          updateActiveItems(filteredList);
        }
        else {
          updatePage("Shop");
        }
    }

    return <>
        <HamburgerMenu updatePage={updatePage} hamburger={hamburger} firstLoad={firstLoad} favorites={favorites} updateFavorites={updateFavorites}/>
        <div className={navBarClass}>
            <div className={hamburgerHomeClass}>
                <img className="hamburgerHomeIcon" src={hamburgerIcon} alt="Menu" height="50" width="50" onClick={hamburgerOnClick}/>
                <img className="hamburgerHomeIcon" src={homeIcon} alt="Home" height="50" width="50" onClick={() => updatePage("Shop")}/>
                {
                  !location ?
                    <img className="pinIcon" src={pinIcon} alt="Location" height="50" width="50" onClick={() => updatePage("Splash")}/>
                    : null
                }
            </div>
            {
                fullWidth ? <input id="searchBar" type="text" className="searchBar" placeholder="Search for groceries..." onChange={search}/> : null
            }
                <div className="signUpLogInWrapper">
                  {
                    !appData ? <>
                      <button className="login" onClick={() => updatePage("Login")}> <b> Log in </b> </button>
                      <button className={signUpClass} onClick={() => updatePage("SignUp")}> <b> Sign up </b> </button>
                    </> : <>
                      <button className="userName"> <b> {outputName} </b> </button>
                      <button className={signOutClass} onClick={signOutOnClick}> <b> Sign out </b> </button>
                    </>
                  }
                  {
                    fullWidth ? <>
                      <input className="shoppingCart" type="image" src={shoppingCart} onClick={() => updatePage("Cart")}/>
                      <span className="cartCount">{cartCount < 100 ? cartCount : "99+"}</span>
                    </> : null
                  }
                </div>
        </div>
    </>
}
