import hero from './assets/hero.jpg'
import groceryMeLogo from './assets/groceryMeLogo.png'
import { NavBar } from '../navBar';

export const Login = ({updatePage}) => <>
    <div className="Background"/>
    <div className="logSignWrapper">
        <div className="ctaText">Welcome Back!</div><br/>
        <img className="logoImage" src={groceryMeLogo} alt="Grocery.me Logo"/>
        <div className="inputRow">
            <div className="logSignText">Email: </div>
            <input type="text" className="logSignInput" placeholder="Email"/><br/>
        </div>
        <div className="inputRow">
            <div className="logSignText">Password: </div>
            <input type="text" className="logSignInput" placeholder="Password"/><br/>
        </div>
        <div>
            <button className="ctaSubmit" onClick={() => updatePage("Splash")}> Log in </button>
        </div>
        <div>
            <button className="logSignlogin" onClick={() => updatePage("SignUp")}> Need an account? <b> Sign up </b> </button>
        </div>
    </div>
</>
