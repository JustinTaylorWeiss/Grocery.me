import React from 'react';
import { itemDB, mapAltSizeIdToSize } from '../LocalDB/itemDB';
import { NavBar } from '../navBar';

export const Cart = ({updatePage, cart, updateCart, favorites, updateFavorites}) => {

    const [totalCost, updateTotalCost] = React.useState(0);

    const mappings = new Map();
    for (const [id, c] of cart) {
      if (mappings.has(id))
        mappings.set(mappings.get(id) + c);
      else
        mappings.set(id, c);
    }
    const pairs = mappings.entries();

    const calculateTotal = () => Math.round(cart.reduce((a, [i, c]) => a+c*itemDB.price[i], 0) * 100) / 100;

    const plusOneToElement = (i) => (
        updateCart(cart.map(
            ([id, count], index) => i === index ? [id, count*1+1] : [id, count]
        ))
    );

    const minusOneToElement = (i) => (
        updateCart(cart.map(
            ([id, count], index) => i === index ? [id, Math.max(count*1-1, 1)] : [id, count]
        ))
    );

    const removeFromCart = (i) => (
        updateCart(cart.filter((e, index) => i !== index))
    )

    return <>
        <NavBar fullWidth={true} updatePage={updatePage} cart={cart} favorites={favorites} updateFavorites={updateFavorites}/>
        <h1 className="productTitle"> Your Cart </h1>
        <div className="cartWrapper">
            <table className="cartTable">
                <tbody>
                    <tr className="heading">
                        <th className="name"><b>Name</b></th>
                        <th className="center"><b>Size</b></th>
                        <th className="center"><b>Quantity</b></th>
                        <th></th>
                        <th className="price"><b>Price</b></th>
                    </tr>
                    {
                        cart.map(([id, count], i) => <tr id={`${i}`}>
                                <th id={`${i}-1`} className="name">{itemDB.names[id]}</th>
                                <th id={`${i}-2`} className="center">{mapAltSizeIdToSize[id]}</th>
                                <th id={`${i}-3`} className="center">
                                    <button id={`${i}-`} className="plusMinus" onClick={() => minusOneToElement(i)}>-</button>
                                    {count}
                                    <button id={`${i}+`} className="plusMinus" onClick={() => plusOneToElement(i)}>+</button>
                                </th>
                                <th id={`${i}-4`} className="center"><button id={`${i}x`} className="remove" onClick={() => removeFromCart(i)}>x</button></th>
                                <th id={`${i}-5`} className="price">${Math.round(itemDB.price[id] * count * 100) / 100}</th>
                        </tr>)
                    }
                    {cart.length > 0 ? <tr>
                        <th className="total">Total</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th className="totalPrice">${calculateTotal()}</th>
                    </tr> : null}
                </tbody>
            </table>
            {cart.length < 1 ? <div className="cartWarning"> Your cart is empty </div> : null}
        </div>
        <div className="centerButton">
            <button className="checkoutButton" onClick={() => updatePage("Checkout")}>Checkout</button>
        </div>
    </>
}
