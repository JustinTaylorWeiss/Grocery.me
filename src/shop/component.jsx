// I Justin Weiss R01918238 certify that this submission is my own origional work.
import hero from './assets/hero.jpg';
import sampleLogo from './assets/sampleLogo.png';
import React from 'react';

import { ItemListing } from '../itemListing';
import { NavBar } from '../navBar';
import { SupportPhone } from '../supportPhone'

export const Shop = ({ updatePage, cart, updateCart, favorites, updateFavorites}) => {

    const [activeItems, updateActiveItems] = React.useState([1,2,3,4,5,6,7,8]);

    const addToCart = (item) => updateCart([...cart, [item, 1]]);
    const toProductPage = (id) => updatePage("Product-" + id);

    return <>
        <NavBar
          fullWidth={true}
          updatePage={updatePage}
          cart={cart}
          favorites={favorites}
          updateFavorites={updateFavorites}
          updateActiveItems={updateActiveItems}
        />
        <SupportPhone/>
        <h1 className="featuredHeading">Featured Items</h1>
        <div className="featuredProduductsCollum">
            {
                activeItems.length <= 0 ?
                  <div className="tableHead2">
                    No items match your search.
                  </div> : null
            }
            {
                Array(
                  activeItems.length / 4 < 0.25
                    ? 0
                    : Math.ceil(activeItems.length / 4)
                ).fill(0).map((eo, io) => (
                <div className="featuredProduductsRow" key={io}>
                {
                  Array(Math.min(activeItems.length - 4*io, 4)).fill(0).map((ei, ii) => (
                    <ItemListing
                      key={activeItems[4*io + ii]}
                      itemID={activeItems[4*io + ii]}
                      toProductPage={toProductPage}
                      addToCart={addToCart}
                      favorites={favorites}
                      updateFavorites={updateFavorites}
                    />
                  ))
                }
                </div>
              ))
            }
        </div>
    </>
}
