import hero from './assets/hero.jpg';
import sampleLogo from './assets/sampleLogo.png';

import { ItemListing } from '../itemListing';
import { NavBar } from '../navBar';

export const Shop = ({ updatePage, cart, updateCart }) => {

    const addToCart = (item) => updateCart([...cart, item]);

    return <>
        <NavBar fullWidth={true} updatePage={updatePage} cart={cart}/>
        <h1 className="featuredHeading">Featured Items</h1>
        <div className="featuredProduductsCollum">
            <div className="featuredProduductsRow">
                <ItemListing itemName="Blueberry" updatePage={updatePage} addToCart={addToCart}/>
                <ItemListing itemName="Strawberry" updatePage={updatePage} addToCart={addToCart}/>
                <ItemListing itemName="Corn" updatePage={updatePage} addToCart={addToCart}/>
                <ItemListing itemName="Bell Pepper" updatePage={updatePage} addToCart={addToCart}/>
            </div>
            <div className="featuredProduductsRow">
                <ItemListing itemName="Lime" updatePage={updatePage} addToCart={addToCart}/>
                <ItemListing itemName="Garlic" updatePage={updatePage} addToCart={addToCart}/>
                <ItemListing itemName="Artichoke" updatePage={updatePage} addToCart={addToCart}/>
                <ItemListing itemName="Carrot" updatePage={updatePage} addToCart={addToCart}/>
            </div>
        </div>
    </>
}
