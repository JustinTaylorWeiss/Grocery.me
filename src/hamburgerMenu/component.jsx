import hero from './assets/hero.jpg'
import groceryMeLogo from './assets/groceryMeLogo.png'

export const HamburgerMenu = ({updatePage, hamburger, firstLoad}) => <>
    <div key={`hamburger ${hamburger}`} className={
        firstLoad ? "hamburgerMenuHidden" :
            hamburger ? "hamburgerMenuIn" :
            "hamburgerMenuOut"
    }>
        <div className="hamburgerSpacer"></div>
        <div className="hamburgerHeading"> Catagories </div>
        <div className="hamburgerListItem"> Essentials </div>
        <div className="hamburgerListItem"> Produce </div>
        <div className="hamburgerListItem"> Meats </div>
        <div className="hamburgerListItem"> Dairy </div>
        <div className="hamburgerListItem"> Bakery </div>
        <div className="hamburgerListItem"> Frozen </div>
        <div className="hamburgerListItem"> Drinks </div>
        <div className="hamburgerListItem"> Sweets </div>
        <div className="hamburgerListItem"> . . . </div>
        <div className="hamburgerHeading"> Favorites </div>
        <div className="hamburgerListItem"> Blueberries </div>
        <div className="hamburgerListItem"> Strawberries </div>
        <div className="hamburgerListItem"> Carrots </div>
        <div className="hamburgerListItem"> Artichokes </div>
        <div className="hamburgerListItem"> Lime </div>
        <div className="hamburgerListItem"> Garlic </div>
        <div className="hamburgerListItem"> Bell Pepper </div>
        <div className="hamburgerListItem"> Corn </div>
        <div className="hamburgerListItem"> . . . </div>
    </div>
</>
