import hero from './assets/hero.jpg'
import groceryMeLogo from './assets/groceryMeLogo.png'
import { itemDB } from '../LocalDB/itemDB';

export const HamburgerMenu = ({updatePage, hamburger, firstLoad}) => {
    return <>
        <div key={`hamburger ${hamburger}`} className={
            firstLoad ? "hamburgerMenuHidden" :
                hamburger ? "hamburgerMenuIn" :
                "hamburgerMenuOut"
        }>
            <div className="hamburgerSpacer"></div>
            <div className="hamburgerHeading"> Favorites </div>
            {
                Object.values(itemDB.IDs).map((id) => (
                    <div className="hamburgerListItem" onClick={() => updatePage("Product-"+id)}>
                        {itemDB.names[id]}
                    </div>
                ))
            }
            <div className="hamburgerListItem"> . . . </div>
        </div>
    </>
}
