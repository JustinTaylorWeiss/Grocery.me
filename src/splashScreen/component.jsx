// I Justin Weiss R01918238 certify that this submission is my own origional work.
import hero from './assets/hero.jpg'
import groceryMeLogo from './assets/groceryMeLogo.png'
import React from 'react';

import { NavBar } from '../navBar';
import { SupportPhone } from '../supportPhone'

export const SplashScreen = ({updatePage, favorites, updateFavorites}) => {

  const onClick = () => {
    const location = document.getElementById("locationInput")?.value ?? "";
    if (location) {
      localStorage.setItem("location", location);
      updatePage("Shop");
    }
  }

  React.useEffect(() => {
    const tempLocation = localStorage.getItem("location");
    if (tempLocation)
      updatePage("Shop");
  },[])

  React.useEffect(() => {
    document.getElementById("locationInput").addEventListener("keyup", (event)=>{
      if (event.keyCode === 13){
        event.preventDefault();
        onClick();
      }
    })
  },[]);

  return <>
    <NavBar fullWidth={false} updatePage={updatePage} favorites={favorites} updateFavorites={updateFavorites}/>
    <SupportPhone/>
    <div className="Background"/>
    <div className="ctaWrapper">
        <div className="ctaText">Find Food Near You</div><br/>
        <img className="logoImage" src={groceryMeLogo} alt="Grocery.me Logo"/>
        <input type="text" id="locationInput" className="ctaInput" placeholder="Enter your street adress or zip code."/><br/>
        <button className="ctaSubmit" onClick={onClick}> Find Food </button>
    </div>
  </>
}
