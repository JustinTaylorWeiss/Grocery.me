import hero from './assets/hero.jpg'
import blueberry from './assets/Blueberries.jpg';
import strawberry from './assets/Strawberries.jpg';
import carrot from './assets/Carrots.jpg';
import artichoke from './assets/Artichokes.jpg';
import lime from './assets/Limes.jpg';
import garlic from './assets/Garlic.jpg';
import corn from './assets/Corn.jpg';
import bellPepper from './assets/BellPeppers.jpg';

export const ItemListing = ({ itemName, updatePage, addToCart }) => {
    const images = {
        Blueberry: blueberry,
        Strawberry: strawberry,
        Carrot: carrot,
        Lime: lime,
        Garlic: garlic,
        Corn: corn,
        BellPepper: bellPepper,
        Artichoke: artichoke,
    };
    const price = {
        Blueberry: "$0.99",
        Strawberry: "$0.99",
        Carrot: "$0.99",
        Artichoke: "$0.99",
        Lime: "$0.99",
        Garlic: "$0.99",
        Corn: "$0.99",
        BellPepper: "$0.99",
    };
    return <div>
            <img className="itemImage" src={images[itemName.replace(/\s/g, '')]} alt={itemName}/>
            <div className="itemWrapper">
                <button className="itemNameText">{itemName}</button>
                <div className="itemButtonRow">
                    <button className="itemText">{price[itemName.replace(/\s/g, '')]}</button>
                    <button className="itemButton" onClick={() => addToCart(itemName)}> <b> Add to cart </b> </button>
                </div>
            </div>
    </div>
}
