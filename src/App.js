import './App.css';
import hamburger from './assets/hamburger.svg'
import hero from './assets/hero.jpg'
import sampleLogo from './assets/sampleLogo.png'

function App() {

  return <>
    <div className="App">
      <div className="Background"/>
      <div className="navBar">
        <img className="hamburgerMenu" src={hamburger} alt="Menu" height="50" width="50"/>
        <div className="signUpLogInWrapper">
          <button className="login"> <b> Log in </b> </button>
          <button className="signUp"> <b> Sign up </b> </button>
        </div>
      </div>
      <div className="ctaWrapper">
        <img className="logoImage" src={sampleLogo} alt="Sample Logo"/>
        <form action="" method="post">
          <label for="CTA" className="ctaText">Find Food Near You</label><br/>
          <input type="text" className="ctaInput" placeholder="Enter your street adress or zip code."/><br/>
          <input type="submit" className="ctaSubmit" value="Find Food"/>
        </form>
      </div>
    </div>
  </>;
}

export default App;
