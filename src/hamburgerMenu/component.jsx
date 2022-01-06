// I Justin Weiss R01918238 certify that this submission is my own origional work.
import hero from './assets/hero.jpg'
import groceryMeLogo from './assets/groceryMeLogo.png'
import { itemDB } from '../LocalDB/itemDB';

export const HamburgerMenu = ({updatePage, hamburger, firstLoad, favorites, updateFavorites}) => {

    const resetLocationOnClick = () => {
      localStorage.setItem("location", "");
      localStorage.setItem("paymentData", []);
      localStorage.setItem("cart", []);
      localStorage.setItem("favorites", []);
      window.location.reload();
    }

    return <>
        <div key={`hamburger ${hamburger}`} className={
            firstLoad ? "hamburgerMenuHidden" :
                hamburger ? "hamburgerMenuIn" :
                "hamburgerMenuOut"
        }>
            <div className="hamburgerSpacer"></div>
            <div className="hamburgerHeading"> Favorites </div>
            {
                (favorites ?? []).length < 1 ?
                    <div className="hamburgerText">Click the star to add to favorites</div>
                    : favorites.map((id, i) => (
                    <div key={`Fav${i}`} className="hamburgerListItem" onClick={() => updatePage("Product-"+id)}>
                        {itemDB.names[id]}
                    </div>
                ))
            }
          <button className="resetLocationButton" onClick={resetLocationOnClick}>
            Reset Data
          </button>
        </div>
    </>
}
