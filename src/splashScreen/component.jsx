import hero from './assets/hero.jpg'
import sampleLogo from './assets/sampleLogo.png'

import { NavBar } from '../navBar';

export const SplashScreen = ({updatePage}) => {
  const onClick = () => updatePage("Shop");
  return <>
    <NavBar fullWidth={false}/>
    <div className="Background"/>
    <div className="ctaWrapper">
      <img className="logoImage" src={sampleLogo} alt="Sample Logo"/>
      <div className="ctaText">Find Food Near You</div><br/>
      <input type="text" className="ctaInput" placeholder="Enter your street adress or zip code."/><br/>
      <button className="ctaSubmit" onClick={onClick}> Find Food </button>
    </div>
  </>
}
