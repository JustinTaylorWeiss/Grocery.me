// I Justin Weiss R01918238 certify that this submission is my own origional work.
import React from 'react';
import { itemDB, mapAltSizeIdToSize } from '../LocalDB/itemDB';
import { AuthDataContext } from '../auth';
import { NavBar } from '../navBar';
import { SupportPhone } from '../supportPhone'

export const OrderConfirmation = ({updatePage, cart, updateCart, favorites, updateFavorites}) => {

    const [appData, updateAppData] = React.useContext(AuthDataContext);

    const maxNumber=10000;
    const randomNumber = Math.floor(Math.random() * maxNumber + 1);

    const sendOrderConfirmation = async (email) => {
      try {
        if(email)
          await window.firebase.firestore().collection("mail").add({
            to: email,
            message: {
              subject: "Order Confirmation",
              text: `Your Grocery.me order has been placed! Order #${randomNumber}`,
            },
          });
      } catch (error) {
        console.error("Error writing document: ", error.message);
      };
    }

    React.useEffect(() => {
      updateCart([]);
      if (appData)
        sendOrderConfirmation(appData.user.email);
    },[])

    return <>
        <NavBar fullWidth={true} updatePage={updatePage} cart={cart} favorites={favorites} updateFavorites={updateFavorites}/>
        <SupportPhone/>
        <h1 className="checkoutProductTitle"> We Received Your Order</h1><br/>
        <div className="inputRow">
            <div className="paymentLabelTextC"> If you are logged in you should be getting a confirmation email soon. </div>
        </div><br/>
        <div className="inputRow">
            <div className="paymentLabelTextC"> Thanks for ordering from Grocery.me </div>
        </div><br/>
        <div className="inputRow">
            <div className="paymentLabelTextC"> Order Confirmation #{randomNumber} </div>
        </div>
    </>
}
