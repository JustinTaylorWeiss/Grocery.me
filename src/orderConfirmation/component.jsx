import React from 'react';
import { itemDB, mapAltSizeIdToSize } from '../LocalDB/itemDB';
import { NavBar } from '../navBar';

export const OrderConfirmation = ({updatePage, cart,  favorites, updateFavorites}) => {
    const maxNumber=10000;
    const randomNumber = Math.floor(Math.random() * maxNumber + 1);


    return <>
        <NavBar fullWidth={true} updatePage={updatePage} cart={cart} favorites={favorites} updateFavorites={updateFavorites}/>
        <h1 className="checkoutProductTitle"> We Received Your Order</h1><br/>
        <div className="inputRow">
            <div className="paymentLabelTextC"> You should be getting a confirmation email soon. </div>
        </div><br/>
        <div className="inputRow">
            <div className="paymentLabelTextC"> Thanks for ordering from Grocery.me </div>
        </div><br/>
        <div className="inputRow">
            <div className="paymentLabelTextC"> Order Confirmation #{randomNumber} </div>
        </div>
    </>
}
