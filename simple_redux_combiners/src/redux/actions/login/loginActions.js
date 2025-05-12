// productActions.js
import { LOGIN, LOGOUT } from "./loginTypes";

export const userLogin = (loginData) => {
  return {
    type: LOGIN,
    payload: loginData
  };
};

export const userLogout = () => {
  return {
    type: LOGOUT,
    payload: null
  };
};
