import hero from './assets/hero.jpg'
import groceryMeLogo from './assets/groceryMeLogo.png'
import { NavBar } from '../navBar';

export const SignUp = ({updatePage, cart, favorites, updateFavorites}) => <>
    <NavBar fullWidth={false} updatePage={updatePage} cart={cart}/>
    <div className="Background"/>
    <div className="logSignWrapper">
        <div className="ctaText">Sign up its free!</div><br/>
        <img className="logoImage" src={groceryMeLogo} alt="Grocery.me Logo"/>
        <div className="inputRow">
            <div className="logSignText">Email: </div>
            <input type="text" className="logSignInput" placeholder="sample@mail.com"/><br/>
        </div>
        <div className="inputRow">
            <div className="logSignText">Password: </div>
            <input type="text" className="logSignInput" placeholder="Minimum 6 characters"/><br/>
        </div>
        <div>
            <button className="ctaSubmit" onClick={() => updatePage("Splash")}> Sign up </button>
        </div>
        <div>
            <button className="logSignlogin" onClick={() => updatePage("Login")}> Already a member? <b> Log in </b> </button>
        </div>
    </div>
</>
