import hero from './assets/hero.jpg';
import sampleLogo from './assets/sampleLogo.png';
import { itemDB } from '../LocalDB/itemDB';

import { ItemListing } from '../itemListing';
import { NavBar } from '../navBar';

export const Shop = ({ updatePage, cart, updateCart }) => {

    const addToCart = (item) => updateCart([...cart, [item, 1]]);
    const toProductPage = (id) => updatePage("Product-" + id);

    return <>
        <NavBar fullWidth={true} updatePage={updatePage} cart={cart}/>
        <h1 className="featuredHeading">Featured Items</h1>
        <div className="featuredProduductsCollum">
            <div className="featuredProduductsRow">
                <ItemListing itemID={1} toProductPage={toProductPage} addToCart={addToCart}/>
                <ItemListing itemID={2} toProductPage={toProductPage} addToCart={addToCart}/>
                <ItemListing itemID={3} toProductPage={toProductPage} addToCart={addToCart}/>
                <ItemListing itemID={4} toProductPage={toProductPage} addToCart={addToCart}/>
            </div>
            <div className="featuredProduductsRow">
                <ItemListing itemID={5} toProductPage={toProductPage} addToCart={addToCart}/>
                <ItemListing itemID={6} toProductPage={toProductPage} addToCart={addToCart}/>
                <ItemListing itemID={7} toProductPage={toProductPage} addToCart={addToCart}/>
                <ItemListing itemID={8} toProductPage={toProductPage} addToCart={addToCart}/>
            </div>
        </div>
    </>
}
