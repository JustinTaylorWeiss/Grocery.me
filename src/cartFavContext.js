// I Justin Weiss R01918238 certify that this submission is my own origional work.
import React from 'react';

export const useCartData = () => {
  const cartDataState = React.useState([]);
  const [cartData, updateCartData] = cartDataState;

  React.useEffect(() => {
    const localCartData = localStorage.getItem('cart');
    if (localCartData) {
      updateCartData(JSON.parse(localCartData));
    }
  },[]);

  React.useEffect(() => {
    if (cartData) {
      localStorage.setItem('cart', JSON.stringify(cartData));
    }
  },[cartData]);

  return cartDataState;
}

export const useFavoriteData = () => {
  const favoriteDataState = React.useState([]);
  const [favoriteData, updateFavoriteData] = favoriteDataState;

  React.useEffect(() => {
    const localFavoriteData = localStorage.getItem('favorites');
    if (localFavoriteData) {
      updateFavoriteData(JSON.parse(localFavoriteData));
    }
  },[]);

  React.useEffect(() => {
    if (favoriteData) {
      localStorage.setItem('favorites', JSON.stringify(favoriteData));
    }
  },[favoriteData]);

  return favoriteDataState;
}

export const usePaymentData = () => {
  const paymentDataState = React.useState([]);
  const [paymentData, updatePaymentData] = paymentDataState;

  React.useEffect(() => {
    const localPaymentData = localStorage.getItem('paymentData');
    if (localPaymentData) {
      updatePaymentData(JSON.parse(localPaymentData));
    }
  },[]);

  React.useEffect(() => {
    if (paymentData) {
      localStorage.setItem('paymentData', JSON.stringify(paymentData));
    }
  },[paymentData]);

  return paymentDataState;
}
