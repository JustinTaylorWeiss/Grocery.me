import hero from './assets/hero.jpg';
import sampleLogo from './assets/sampleLogo.png';

import { FeaturedItem } from '../featuredItem';
import { ItemListing } from '../featuredItem';
import { NavBar } from '../navBar';

export const Shop = ({ updatePage }) => {
  return <>
    <NavBar fullWidth={true}/>
    
    <h1 className="featuredHeading">Featured Items</h1>
    <div className="featuredProduducts">
      <FeaturedItem/>
    </div>
  </>
}
