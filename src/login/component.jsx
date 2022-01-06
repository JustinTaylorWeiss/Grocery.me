// I Justin Weiss R01918238 certify that this submission is my own origional work.
import hero from './assets/hero.jpg';
import groceryMeLogo from './assets/groceryMeLogo.png';
import React from 'react';
import { AuthDataContext } from '../auth';
import { NavBar } from '../navBar';
import { SupportPhone } from '../supportPhone';
const provider = new window.firebase.auth.GoogleAuthProvider();

export const Login = ({updatePage, cart,  favorites, updateFavorites}) => {

  const [appData, updateAppData] = React.useContext(AuthDataContext);
  const [signInError, updateSignInError] = React.useState("");

const defaultSignIn = async () => {
  try {
    const email = document.getElementById("emailInput")?.value ?? "";
    const password = document.getElementById("passwordInput")?.value ?? "";
    if (email && password) {
      const userCredential = await window.firebase.auth().signInWithEmailAndPassword(email, password);
      updateAppData({
        user: userCredential.user,
      });
      updatePage("Shop");
    }
  } catch (error) {
    //const errorCode = error.code;
    updateSignInError(error.message);
  }
}

const popUpSignIn = async () => {
  try {
    const result = await window.firebase.auth().signInWithPopup(provider);
    /* @type {firebase.auth.OAuthCredential} */
    const credential = result.credential;
    updateAppData({
      credential: credential,
      token: credential.accessToken,
      user: result.user,
    });
    updatePage('Shop');
  } catch (error) {
    //const errorCode = error.code;
    updateSignInError(error.message);
    // The email of the user's account used.
    //const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    ///const credential = error.credential;
  };
}

  React.useEffect(() => {
    document.getElementById("emailInput").addEventListener("keyup", (event)=>{
      if (event.keyCode === 13){
        event.preventDefault();
        defaultSignIn();
      }
    })
    document.getElementById("passwordInput").addEventListener("keyup", (event)=>{
      if (event.keyCode === 13){
        event.preventDefault();
        defaultSignIn();
      }
    })
  },[]);

  return <>
      <NavBar fullWidth={false} updatePage={updatePage} cart={cart} favorites={favorites} updateFavorites={updateFavorites}/>
      <SupportPhone/>
      <div className="Background"/>
      <div className="logSignWrapper">
        <div className={signInError ? "ctaError" : "ctaText"}>
          {
            signInError ?
            signInError :
            "Welcome Back!"
          }
        </div><br/>
          <img className="logoImage" src={groceryMeLogo} alt="Grocery.me Logo"/>
          <div className="inputRow">
              <div className="logSignText">Email: </div>
              <input id="emailInput" type="text" className="logSignInput" placeholder="Email"/><br/>
          </div>
          <div className="inputRow">
              <div className="logSignText">Password: </div>
              <input id="passwordInput" type="password" className="logSignInput" placeholder="Password"/><br/>
          </div>
          <div>
              <button className="ctaSubmit" onClick={defaultSignIn}> Log in </button><br/>
          </div>
          <div>
              <button className="logSignlogin" onClick={() => updatePage("SignUp")}> Need an account? <b> Sign up </b> </button>
          </div>
      </div>
  </>
}
