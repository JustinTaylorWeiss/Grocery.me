// I Justin Weiss R01918238 certify that this submission is my own origional work.
import React from 'react';
import { itemDB, mapAltSizeIdToSize } from '../LocalDB/itemDB';
import { NavBar } from '../navBar';
import { SupportPhone } from '../supportPhone'
import { usePaymentData } from '../cartFavContext';

const LongInputLine = ({label, placeholder, innerID}) => <>
    <div key={`d1${innerID}`} className="inputRow">
        <div key={`d2${innerID}`} className="paymentLabelText"> {label} </div>
    </div>
    <div key={`d3${innerID}`} className="inputRow">
        <input key={`in${innerID}`} id={innerID} type="text" className="paymentLongField" placeholder={placeholder}/>
    </div>
</>

export const Checkout = ({updatePage, cart, updateCart, favorites, updateFavorites}) => {

    const [totalCost, updateTotalCost] = React.useState(0);
    const [paymentSaved, updatePaymentSaved] = React.useState(false);
    const [paymentReminder, updatePaymentReminder] = React.useState("");
    const [cartWarning, updateCartWarning] = React.useState(false);
    const [billingSameAsDelivery, updateBillingSameAsDelivery] = React.useState(true);
    const [useSavedInfo, updateUseSavedInfo] = React.useState(false);
    const paymentInfoDataState = usePaymentData();
    const [savedInfo, updateSavedInfo] = paymentInfoDataState;
    const [discountCode, updateDiscountCode] = React.useState("");

    const collectInfo = () => (
      Array(billingSameAsDelivery ? 15 : 23).fill(0).map(
        (e, i) => (
          document.getElementById(`checkout${i+1}`)?.value ?? ""
        )
      ) ?? []
    );

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

    const calculateSubtotal = () => Math.round(cart.reduce((a, [i, c]) => a+c*itemDB.price[i], 0) * 100) / 100;

    const calculateTotal = () => {
      const subtotal = calculateSubtotal();
      if(discountCode.toLowerCase() === "20off")
        return subtotal * 0.8;
      return subtotal;
    };

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
      updatePaymentReminder("");
      updatePaymentSaved(true);
      updateUseSavedInfo(true);
      const info = collectInfo();
      updateSavedInfo(info);
    }

    const updateDiscountCodeOnChange = () => {
      const code = document.getElementById("discountCode")?.value ?? "";
      updateDiscountCode(code);
    }

    const checkoutButton = () => {
      if(useSavedInfo && savedInfo && cart.length > 0)
        updatePage("orderConfirmation");
      else {
        if (cart.length <= 0)
          updateCartWarning(true);
        else
          updatePaymentReminder("Payment Information Invalid");
      }
    }

    return <>
        <NavBar fullWidth={true} updatePage={updatePage} cart={cart} favorites={favorites} updateFavorites={updateFavorites}/>
        <SupportPhone/>
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
                        <div className="paymentLabelTextRed">{paymentReminder}</div>
                    </div>
                    </> : null
                }
                {
                    (savedInfo?.length ?? 0) > 0 ? <>
                      <div className="inputRow">
                        <input className="savedInfoCheckBox" id="checkout15" type="checkBox" onChange={() => updateUseSavedInfo(!useSavedInfo)} checked={useSavedInfo}/>
                        <label className="paymentLabelTextSmall">Use saved billing / delivery info</label>
                      </div> </> : null
                }
                {
                  !useSavedInfo ? <>
                    <div className="inputRow">
                        <div className="paymentLabelText">First Name </div>
                        <div className="paymentLabelText">Last Name </div>
                    </div>
                    <div className="inputRow">
                        <div className="inputWithSpacer">
                            <input id="checkout1" type="text" className="logSignInput" placeholder="John"/>
                        </div>
                        <input id="checkout2" type="text" className="logSignInput" placeholder="Smith"/>
                    </div>
                    <LongInputLine key="LIL1" label="Credit Card Number" placeholder="Credit Card Number" innerID="checkout3"/>
                    <div className="inputRow">
                        <div className="paymentLabelText">Expiration Date</div>
                        <div className="paymentLabelTextR">CVV</div>
                    </div>
                    <div className="inputRow">
                        <div className="inputWithSpacer">
                            <input id="checkout4" type="text" className="logSignInput" placeholder="Month"/>
                        </div>
                        <div className="inputWithSpacer">
                            <input id="checkout5" type="text" className="logSignInput" placeholder="Year"/>
                        </div>
                        <input id="checkout6" type="text" className="logSignInput" placeholder="CVV"/>
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
                            <input id="checkout7" type="text" className="logSignInput" placeholder="John"/>
                        </div>
                        <input id="checkout8" type="text" className="logSignInput" placeholder="Smith"/>
                    </div>
                    <LongInputLine key="LIL2" label="Address 1" placeholder="123 Main Street" innerID="checkout9"/>
                    <LongInputLine key="LIL3" label="Address 2" placeholder="Apt, Office, Suite" innerID="checkout10"/>
                    <LongInputLine key="LIL4" label="City" placeholder="City" innerID="checkout11"/>
                    <div className="inputRow">
                        <div className="paymentLabelText">State</div>
                        <div className="paymentLabelText">Zip</div>
                        <div className="paymentLabelText">Country</div>
                    </div>
                    <div className="inputRow">
                        <div className="inputWithSpacer">
                            <input id="checkout12" type="text" className="logSignInput" placeholder="State"/>
                        </div>
                        <div className="inputWithSpacer">
                            <input id="checkout13" type="text" className="logSignInput" placeholder="Zip"/>
                        </div>
                        <input id="checkout14" type="text" className="logSignInput" placeholder="Country"/>
                    </div>
                    <div className="inputRow">
                        <input className="savedInfoCheckBox" id="checkout15" type="checkBox" onChange={() => updateBillingSameAsDelivery(!billingSameAsDelivery)} checked={billingSameAsDelivery}/>
                      <label className="paymentLabelTextSmall">Use billing address as delivery address</label>
                    </div>
                    {
                      !billingSameAsDelivery ? <>
                      <div className="inputRow">
                          <div className="paymentSecondaryHeader">Delivery Information</div>
                      </div>
                      <div className="inputRow">
                          <div className="paymentLabelText">First Name </div>
                          <div className="paymentLabelText">Last Name </div>
                      </div>
                      <div className="inputRow">
                          <div className="inputWithSpacer">
                              <input id="checkout16" type="text" className="logSignInput" placeholder="John"/>
                          </div>
                          <input id="checkout17" type="text" className="logSignInput" placeholder="Smith"/>
                      </div>
                      <LongInputLine key="LIL6" label="Address 1" placeholder="123 Main Street" innerID="checkout18"/>
                      <LongInputLine key="LIL7" label="Address 2" placeholder="Apt, Office, Suite" innerID="checkout19"/>
                      <LongInputLine key="LIL8" label="City" placeholder="City" innerID="checkout20"/>
                      <div className="inputRow">
                          <div className="paymentLabelText">State</div>
                          <div className="paymentLabelText">Zip</div>
                          <div className="paymentLabelText">Country</div>
                      </div>
                      <div className="inputRow">
                          <div className="inputWithSpacer">
                              <input id="checkout21" type="text" className="logSignInput" placeholder="State"/>
                          </div>
                          <div className="inputWithSpacer">
                              <input id="checkout22" type="text" className="logSignInput" placeholder="Zip"/>
                          </div>
                          <input id="checkout23" type="text" className="logSignInput" placeholder="Country"/>
                      </div>
                      </> : null
                  }
                    <div>
                        <button className="ctaSubmit" onClick={paymentSave}> Save </button>
                    </div>
                  </> : null
                }
            </div>
            <div className="checkoutSpacer"/>
            <div className ="checkoutCartCluster">
                <div className="paymentHeading">Cart</div><br/>
                  {
                    cartWarning ? <>
                      <div className="paymentSavedAlert">
                          <div className="paymentLabelTextRed">Cart is empty</div>
                      </div> </> : null
                  }
                <table className="checkoutCartTable">
                    <tbody>
                        <tr key="head1" className="heading">
                            <th className="name"><b>Name</b></th>
                            <th className="center"><b>Size</b></th>
                            <th className="center"><b>Quantity</b></th>
                            <th></th>
                            <th className="price"><b>Price</b></th>
                        </tr>
                        {
                            cart.map(([id, count], i) => <tr id={`cart ${i}`}>
                                    <th key={`${i}-1`} className="name">{itemDB.names[id]}</th>
                                    <th key={`${i}-2`} className="center">{mapAltSizeIdToSize[id]}</th>
                                    <th key={`${i}-3`} className="center">
                                        <button key={`${i}-`} className="checkoutPlusMinus" onClick={() => minusOneToElement(i)}>-</button>
                                          {count}
                                        <button key={`${i}+`} className="checkoutPlusMinus" onClick={() => plusOneToElement(i)}>+</button>
                                    </th>
                                    <th key={`${i}-4`} className="center"><button key={`${i}x`} className="checkoutRemove" onClick={() => removeFromCart(i)}>x</button></th>
                                    <th key={`${i}-5`} className="price">${(Math.round(itemDB.price[id] * count * 100) / 100).toFixed(2)}</th>
                            </tr>)
                        }
                        {
                          cart.length > 0 ? <>
                            {
                              discountCode.toLowerCase() === "20off" ? <>
                                <tr key="dc 1">
                                    <th className="total">Subtotal</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th className="totalPrice">${calculateSubtotal().toFixed(2)}</th>
                                </tr>
                                <tr key="dc 2">
                                    <th className="total">Discount</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th className="totalPrice">-20%</th>
                                </tr>
                              </> : null
                            }
                            <tr key="dc 3">
                                <th className="total">Total</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th className="totalPrice">${calculateTotal().toFixed(2)}</th>
                            </tr>
                          </>: null}
                    </tbody>
                </table>
                {cart.length < 1 ? <div className="cartWarning"> Your cart is empty </div> : null}
                <br/>
                <div className="inputRow">
                    <div className="paymentLabelTextC"> Discount Code </div>
                    <input id="discountCode" type="text" className="discountCodeInput" placeholder="Code" onChange={updateDiscountCodeOnChange}/>
                </div><br/>
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
        <div className="checkoutSpacer"/>
    </>
}
