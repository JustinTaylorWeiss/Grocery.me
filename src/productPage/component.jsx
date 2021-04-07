import React from 'react';
import { NavBar } from '../navBar';
import { itemDB, mapItemToAltSizeIds, mapAltSizeIdsToItem } from '../LocalDB/itemDB';
import starHollow from './assets/starH.svg';
import starSolid from './assets/starS.svg';

export const ProductPage = ({ itemID, updatePage, cart, updateCart, favorites, updateFavorites}) => {
    
    const [product, updateProduct] = React.useState(null);
    React.useEffect(() => {
        (async () => {
            const response = await fetch(`https://i57jtf4g8l.execute-api.us-east-1.amazonaws.com/dev/products/${itemID}`);
            const body = await response.json();
            updateProduct(body.product);
        })()
    }, [itemID])
    console.log(product);

    const pricesObj = itemDB.prices[itemID];
    const addToCart = (index, quantity) => updateCart([...cart, [mapItemToAltSizeIds[itemID][index], quantity]]);

    const updateFav = () => {
        if(favorites.includes(mapAltSizeIdsToItem[itemID]))
            updateFavorites(favorites.filter((id) => id !== mapAltSizeIdsToItem[itemID]));
        else
            if(!favorites.includes(mapAltSizeIdsToItem[itemID]))
                updateFavorites([...favorites, mapAltSizeIdsToItem[itemID]]);
    }

    return <>
        <NavBar fullWidth={true} updatePage={updatePage} cart={cart} favorites={favorites} updateFavorites={updateFavorites}/>
        <div className="productPageNameWrapper">
            <h1 className="productTitle">{itemDB.names[itemID]}</h1>
            <div className="nameSpacer"/>
            <img className="favoriteStar" width={40} height={40}
                src={favorites.includes(mapAltSizeIdsToItem[itemID]) ? starSolid : starHollow}
                alt={favorites.includes(mapAltSizeIdsToItem[itemID]) ? "Solid Star" : "Hollow Star"}
                onClick={updateFav}
            />
        </div>
        <div className="sizesContainer">
            <aside className="tableWrapper">
                <h1 className="tableHead1">Select a size</h1>
                <div className="tableHead2">
                    Add
                    <input type="text" id="qIn" className="quantityInput" defaultValue="1"/>
                    to your cart
                </div>
                <table>
                    <tbody>
                        <tr className="heading">
                            <th><b>Size</b></th>
                            <th><b>Price</b></th>
                        </tr>
                        {
                            Object.keys(pricesObj).map((key, index) =>
                            <tr key={index} onClick={() =>
                                addToCart(index, document.getElementById("qIn").value ?? 1)
                            }>
                                <th key={`${index}-1`}>
                                    {key}
                                </th>
                                <th key={`${index}-2`}>
                                    {`$${pricesObj[key]}`}
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </aside>
            <img className="productPhoto" src={itemDB.images[itemID]} alt={itemDB.names[itemID]}/>
        </div>
        <h1 className="productTitle"> Product Details </h1>
        <p className="productDesciption"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur ex eu facilisis tempor. Etiam luctus facilisis purus ut cursus. Donec at rutrum ex, id tincidunt odio. Cras placerat tortor at massa maximus elementum. Nam augue nunc, sollicitudin et tempor eget, faucibus eget nulla. Morbi at vestibulum ex, quis egestas metus. Aliquam leo felis, auctor eu eros id, feugiat rutrum urna. </p>
        <p className="productDesciption"> Donec id luctus ante. Pellentesque imperdiet eget magna sit amet eleifend. Nam tortor massa, faucibus non convallis vitae, suscipit non tellus. Curabitur et venenatis ipsum, eget interdum enim. Morbi justo tellus, maximus sed magna ut, congue semper metus. Vivamus fringilla placerat magna, non dignissim risus varius nec. Nullam eget blandit justo. Praesent ultricies lacus at tempus consequat. Aliquam sodales at metus sit amet finibus. </p>
    </>
}
