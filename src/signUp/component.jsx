// I Justin Weiss R01918238 certify that this submission is my own origional work.
import hero from './assets/hero.jpg'
import groceryMeLogo from './assets/groceryMeLogo.png'
import { NavBar } from '../navBar';
import { AuthDataContext } from '../auth';
import React from 'react';
import { SupportPhone } from '../supportPhone'

export const SignUp = ({updatePage, cart, favorites, updateFavorites}) => {

  const [appData, updateAppData] = React.useContext(AuthDataContext);
  const [signUpError, updateSignUpError] = React.useState("");

  const sendWelcomeEmail = async (email) => {
    try {
      await window.firebase.firestore().collection("mail").add({
        to: email,
        message: {
          subject: "Welcome to Grocery.me!",
          text: "Your Grocery.me account has been created!",
        },
      });
    } catch (error) {
      console.error("Error writing document: ", error.message);
    };
  }

  const defaultSignUp = async () => {
    try {
      const email = document.getElementById("emailInput")?.value ?? "";
      const username = document.getElementById("usernameInput")?.value ?? "";
      const password = document.getElementById("passwordInput")?.value ?? "";
      const confirmedPassword = document.getElementById("passwordConfirmationInput")?.value ?? "";
      if (email && username && password && (password === confirmedPassword)) {
        const userCredential = await window.firebase.auth().createUserWithEmailAndPassword(email, password);
        //updateAppData({
          //user: userCredential.user,
        //});
        //sendWelcomeEmail(email);
        updatePage("Login");
      }
    } catch (error) {
      //const errorCode = error.code;
      updateSignUpError(error.message);
    }
  }

  React.useEffect(() => {
    document.getElementById("emailInput").addEventListener("keyup", (event)=>{
      if (event.keyCode === 13){
        event.preventDefault();
        defaultSignUp();
      }
    })
    document.getElementById("passwordInput").addEventListener("keyup", (event)=>{
      if (event.keyCode === 13){
        event.preventDefault();
        defaultSignUp();
      }
    })
  },[]);

  return <>
      <NavBar fullWidth={false} updatePage={updatePage} cart={cart}/>
      <SupportPhone/>
      <div className="Background"/>
      <div className="logSignWrapper">
          <div className={signUpError ? "ctaError" : "ctaText"}>
            {
              signUpError ?
              signUpError :
              "Sign up its free!"
            }
          </div><br/>
          <img className="logoImage" src={groceryMeLogo} alt="Grocery.me Logo"/>
          <div className="inputRow">
              <div className="logSignText">Email: </div>
              <input id="emailInput" type="text" className="logSignInput" placeholder="sample@mail.com"/><br/>
          </div>
          <div className="inputRow">
              <div className="logSignText">Username: </div>
              <input id="usernameInput" type="text" className="logSignInput" placeholder="Username"/><br/>
          </div>
          <div className="inputRow">
              <div className="logSignText">Password: </div>
              <input id="passwordInput" type="password" className="logSignInput" placeholder="Minimum 6 characters"/><br/>
          </div>
          <div className="inputRow">
              <div className="logSignText">Confirm: </div>
              <input id="passwordConfirmationInput" type="password" className="logSignInput" placeholder="Confirm Password"/><br/>
          </div>
          <div>
              <button className="ctaSubmit" onClick={defaultSignUp}> Sign up </button>
          </div>
          <div>
              <button className="logSignlogin" onClick={() => updatePage("Login")}> Already a member? <b> Log in </b> </button>
          </div>
      </div>
  </>
}
