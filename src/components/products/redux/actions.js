import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  FECTH_FEATURED_PRODUCTS,
  FECTH_PRODUCT_BYSLUG,
  SET_PRODUCT,
} from "./types";
import apiUrl from "./../../../api";
import Swal from "sweetalert2";

import axios from "axios";

export const fetchProducts = (search) => async (dispatch) => {
  try {
    let response = await axios.get(`${apiUrl}/products?search=${search ?? ""}`);
    dispatch({ type: FETCH_PRODUCTS, payload: response.data });
  } catch (err) {
    Swal.fire({ icon: "error", text: err });
  }
};

export const fetchProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCT, payload: data });
  } catch (err) {
    Swal.fire({ icon: "error", text: err });
  }
};

export const fetchFeaturedProducts = () => async (dispatch) => {
  try {
    let response = await axios.get(`${apiUrl}/products-featured`);
    dispatch({ type: FECTH_FEATURED_PRODUCTS, payload: response.data });
  } catch (err) {
    Swal.fire({ icon: "error", text: err });
  }
};

export const fetchProductBySlug = (slug) => async (dispatch) => {
  try {
    let response = await axios.get(`${apiUrl}/products-byslug/${slug}`);
    dispatch({ type: FECTH_PRODUCT_BYSLUG, payload: response.data });
  } catch (err) {
    Swal.fire({ icon: "error", text: err });
  }
};

export const setProduct = (product) => (dispatch) => {
  dispatch({ type: SET_PRODUCT, payload: product });
};
