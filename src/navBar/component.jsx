import React from 'react';
import hamburgerIcon from './assets/hamburger.svg';
import shoppingCart from './assets/shoppingCart.svg';

import { HamburgerMenu } from '../hamburgerMenu';

export const NavBar = ({fullWidth, updatePage, cart}) => {

    const [hamburger, updateHamburger] = React.useState(false);
    const [firstLoad, updateFirstLoad] = React.useState(true);

    const hamburgerClass = fullWidth ? "hamburgerMenuIconFull" : "hamburgerMenuIcon";
    const signUpClass = fullWidth ? "signUpFull" : "signUp";
    const navBarClass = fullWidth ? "navBarFull" : "navBar";

    const hamburgerOnClick = () => {
        updateFirstLoad(false);
        updateHamburger(!hamburger);
    }

    return <>
        <HamburgerMenu updatePage={updatePage} hamburger={hamburger} firstLoad={firstLoad}/>
        <div className={navBarClass}>
            <img className={hamburgerClass} src={hamburgerIcon} alt="Menu" height="50" width="50" onClick={hamburgerOnClick}/>
            {
                fullWidth ? <input type="text" className="searchBar" placeholder="Search for groceries..."/> : <null/>
            }
            <div className="signUpLogInWrapper">
                <button className="login" onClick={() => updatePage("Login")}> <b> Log in </b> </button>
                <button className={signUpClass} onClick={() => updatePage("SignUp")}> <b> Sign up </b> </button>
                {
                    fullWidth ? <>
                        <input className="shoppingCart" type="image" src={shoppingCart} onClick={() => console.log(cart)}/>
                        <span className="cartCount">{cart.length < 100 ? cart.length : "99+"}</span>
                    </> : <null/>
                }
            </div>
        </div>
    </>
}
