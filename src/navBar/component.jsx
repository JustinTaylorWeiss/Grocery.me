import React from 'react';
import hamburgerIcon from './assets/hamburger.svg';
import homeIcon from './assets/homeIcon.svg';
import shoppingCart from './assets/shoppingCart.svg';

import { HamburgerMenu } from '../hamburgerMenu';

export const NavBar = ({fullWidth, updatePage, cart, favorites, updateFavorites}) => {

    const [hamburger, updateHamburger] = React.useState(false);
    const [firstLoad, updateFirstLoad] = React.useState(true);

    const hamburgerHomeClass = fullWidth ? "hamburgerHomeWrapperFull" : "hamburgerHomeWrapper"
    const signUpClass = fullWidth ? "signUpFull" : "signUp";
    const navBarClass = fullWidth ? "navBarFull" : "navBar";

    const hamburgerOnClick = () => {
        updateFirstLoad(false);
        updateHamburger(!hamburger);
    }

    const cartCount = fullWidth ? cart.reduce((a, e) => a+(e[1]*1), 0) : 0;

    return <>
        <HamburgerMenu updatePage={updatePage} hamburger={hamburger} firstLoad={firstLoad} favorites={favorites} updateFavorites={updateFavorites}/>
        <div className={navBarClass}>
            <div className={hamburgerHomeClass}>
                <img className="hamburgerHomeIcon" src={hamburgerIcon} alt="Menu" height="50" width="50" onClick={hamburgerOnClick}/>
                <img className="hamburgerHomeIcon" src={homeIcon} alt="Home" height="50" width="50" onClick={() => updatePage("Shop")}/>
            </div>
            {
                fullWidth ? <input type="text" className="searchBar" placeholder="Search for groceries..."/> : <null/>
            }
            <div className="signUpLogInWrapper">
                <button className="login" onClick={() => updatePage("Login")}> <b> Log in </b> </button>
                <button className={signUpClass} onClick={() => updatePage("SignUp")}> <b> Sign up </b> </button>
                {
                    fullWidth ? <>
                        <input className="shoppingCart" type="image" src={shoppingCart} onClick={() => updatePage("Cart")}/>
                        <span className="cartCount">{cartCount < 100 ? cartCount : "99+"}</span>
                    </> : <null/>
                }
            </div>
        </div>
    </>
}
