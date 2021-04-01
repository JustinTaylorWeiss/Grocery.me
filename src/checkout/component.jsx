import React from 'react';
import { itemDB, mapAltSizeIdToSize } from '../LocalDB/itemDB';
import { NavBar } from '../navBar';

const LongInputLine = ({label, placeholder}) => <>
    <div className="inputRow">
        <div className="paymentLabelText"> {label} </div>
    </div>
    <div className="inputRow">
        <input type="text" className="paymentLongField" placeholder={placeholder}/>
    </div>
</>

export const Checkout = ({updatePage, cart, updateCart, favorites, updateFavorites}) => {

    const [totalCost, updateTotalCost] = React.useState(0);
    const [paymentSaved, updatePaymentSaved] = React.useState(false);
    const [paymentReminder, updatePaymentReminder] = React.useState(false);

    const maxNumber = 10000;
    const randomNumber = Math.floor(Math.random() * maxNumber + 1);

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

    const paymentSave = () => {
        updatePaymentSaved(true);
        updatePaymentReminder(false);
    }

    const checkoutButton = () => {
        if(paymentSaved)
            updatePage("orderConfirmation");
        else
            updatePaymentReminder(true);
    }

    return <>
        <NavBar fullWidth={true} updatePage={updatePage} cart={cart} favorites={favorites} updateFavorites={updateFavorites}/>
        <h1 className="checkoutProductTitle"> Checkout </h1>
        <div className="checkoutWrapper">
            <div className="paymentWrapper">
                <div className="paymentHeading">Payment Informaton</div><br/>
                {
                    paymentSaved ? <>
                    <div className="paymentSavedAlert">
                        <div className="paymentLabelTextC">Payment Information Saved</div>
                    </div>
                    </> :
                    paymentReminder ? <>
                    <div className="paymentSavedAlert">
                        <div className="paymentLabelTextRed">Payment Information Invalid</div>
                    </div>
                    </> :
                     null
                }
                <div className="inputRow">
                    <div className="paymentLabelText">First Name </div>
                    <div className="paymentLabelText">Last Name </div>
                </div>
                <div className="inputRow">
                    <div className="inputWithSpacer">
                        <input type="text" className="logSignInput" placeholder="John"/>
                    </div>
                    <input type="text" className="logSignInput" placeholder="Smith"/>
                </div>
                <LongInputLine key="01" label="Credit Card Number" placeholder="Credit Card Number"/>
                <div className="inputRow">
                    <div className="paymentLabelText">Experiation Date</div>
                    <div className="paymentLabelTextR">CVV</div>
                </div>
                <div className="inputRow">
                    <div className="inputWithSpacer">
                        <input type="text" className="logSignInput" placeholder="Month"/>
                    </div>
                    <div className="inputWithSpacer">
                        <input type="text" className="logSignInput" placeholder="Year"/>
                    </div>
                    <input type="text" className="logSignInput" placeholder="CVV"/>
                </div>
                <div className="inputRow">
                    <div className="paymentSecondaryHeader">Billing Information</div>
                </div>
                <div className="inputRow">
                    <div className="paymentLabelText">First Name </div>
                    <div className="paymentLabelText">Last Name </div>
                </div>
                <div className="inputRow">
                    <div className="inputWithSpacer">
                        <input type="text" className="logSignInput" placeholder="John"/>
                    </div>
                    <input type="text" className="logSignInput" placeholder="Smith"/>
                </div>
                <LongInputLine key="02" label="Adress 1" placeholder="123 Main Street"/>
                <LongInputLine key="03" label="Adress 2" placeholder="Apt, Office, Suite"/>
                <LongInputLine key="04" label="City" placeholder="City"/>
                <div className="inputRow">
                    <div className="paymentLabelText">State</div>
                    <div className="paymentLabelText">Zip</div>
                    <div className="paymentLabelText">Country</div>
                </div>
                <div className="inputRow">
                    <div className="inputWithSpacer">
                        <input type="text" className="logSignInput" placeholder="State"/>
                    </div>
                    <div className="inputWithSpacer">
                        <input type="text" className="logSignInput" placeholder="Zip"/>
                    </div>
                    <input type="text" className="logSignInput" placeholder="Country"/>
                </div>
                <div>
                    <button className="ctaSubmit" onClick={paymentSave}> Save </button>
                </div>
            </div>
            <div className="checkoutSpacer"/>
            <div className ="checkoutCartCluster">
                <div className="paymentHeading">Cart</div><br/>
                <table className="checkoutCartTable">
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
                                        <button id={`${i}-`} className="checkoutPlusMinus" onClick={() => minusOneToElement(i)}>-</button>
                                        {count}
                                        <button id={`${i}+`} className="checkoutPlusMinus" onClick={() => plusOneToElement(i)}>+</button>
                                    </th>
                                    <th id={`${i}-4`} className="center"><button id={`${i}x`} className="checkoutRemove" onClick={() => removeFromCart(i)}>x</button></th>
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
                <br/>
                <div className="inputRow">
                    <div className="paymentLabelTextC"> Special Requests </div>
                </div><br/>
                <div className="inputRow">
                    <textarea className="checkoutTextArea" placeholder="Special Requests"/>
                </div>
            </div>
        </div>

        <div className="checkoutButton">
            <button className="checkout" onClick={checkoutButton}>Checkout</button>
        </div>
    </>
}
