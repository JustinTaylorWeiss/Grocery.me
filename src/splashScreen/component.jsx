import hero from './assets/hero.jpg'
import groceryMeLogo from './assets/groceryMeLogo.png'

import { NavBar } from '../navBar';

export const SplashScreen = ({updatePage}) => {
  const onClick = () => updatePage("Shop");
  return <>
    <NavBar fullWidth={false} updatePage={updatePage}/>
    <div className="Background"/>
    <div className="ctaWrapper">
        <div className="ctaText">Find Food Near You</div><br/>
        <img className="logoImage" src={groceryMeLogo} alt="Grocery.me Logo"/>
        <input type="text" className="ctaInput" placeholder="Enter your street adress or zip code."/><br/>
        <button className="ctaSubmit" onClick={onClick}> Find Food </button>
    </div>
  </>
}
