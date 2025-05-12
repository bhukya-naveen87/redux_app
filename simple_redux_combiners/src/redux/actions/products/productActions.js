// productActions.js
import { ADD_TO_CART, REMOVE_FROM_CART } from "./productTypes";

export const addToCart = (productData) => {
  return {
    type: ADD_TO_CART,
    payload: productData
  };
};
export const removeFromCart = (productData) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productData
  };
};
