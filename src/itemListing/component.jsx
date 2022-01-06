// I Justin Weiss R01918238 certify that this submission is my own origional work.
import { itemDB, mapAltSizeIdsToItem } from '../LocalDB/itemDB';
import starHollow from './assets/starH.svg';
import starSolid from './assets/starS.svg';

export const ItemListing = ({ itemID, toProductPage, addToCart, favorites, updateFavorites }) => {

    const updateFav = () => {
        if(favorites.includes(mapAltSizeIdsToItem[itemID]))
            updateFavorites(favorites.filter((id) => id !== mapAltSizeIdsToItem[itemID]));
        else
            if(!favorites.includes(mapAltSizeIdsToItem[itemID]))
                updateFavorites([...favorites, mapAltSizeIdsToItem[itemID]]);
    }

    return <div>
        <img className="itemImage" src={itemDB.images[itemID]} alt={itemDB.names[itemID]} onClick={() => toProductPage(itemID)}/>
        <div className="itemWrapper">
            <div className="nameWrapper">
                <div className="longNameSpacer"/>
                <button className="itemNameText" onClick={() => toProductPage(itemID)}>{itemDB.names[itemID]}</button>
                <div className="nameSpacer"/>
                <img className="favoriteStar" width={20} height={20}
                    src={favorites.includes(mapAltSizeIdsToItem[itemID]) ? starSolid : starHollow}
                    alt={favorites.includes(mapAltSizeIdsToItem[itemID]) ? "Solid Star" : "Hollow Star"}
                    onClick={updateFav}
                />
            </div>
            <div className="itemButtonRow">
                <button className="itemText" onClick={() => toProductPage(itemID)}>{itemDB.minMaxPrices[itemID]}</button>
                <button className="itemButton" onClick={() => addToCart(itemID)}> <b> Add to cart </b> </button>
            </div>
        </div>
    </div>
}
