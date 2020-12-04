import { ADD_PRODUCT, REMOVE_PRODUCT, RESET_CART } from "./types";

import axios from "axios";

export const addProductToCart = (product) => async (dispatch) => {
  dispatch({ type: ADD_PRODUCT, payload: product });
};

export const removeProductToCart = (index) => async (dispatch) => {
  dispatch({ type: REMOVE_PRODUCT, payload: index });
};

export const resetProductCart = () => async (dispatch) => {
  dispatch({ type: RESET_CART, payload: [] });
};
