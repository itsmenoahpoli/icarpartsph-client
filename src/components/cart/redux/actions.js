import { ADD_PRODUCT, REMOVE_PRODUCT } from "./types";
import apiUrl from "./../../../api";
import Swal from "sweetalert2";

import axios from "axios";

export const addProductToCart = (product) => async (dispatch) => {
  dispatch({ type: ADD_PRODUCT, payload: product });
};

export const removeProductToCart = (index) => async (dispatch) => {
  dispatch({ type: REMOVE_PRODUCT, payload: index });
};
