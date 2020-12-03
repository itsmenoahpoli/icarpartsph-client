import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  FECTH_FEATURED_PRODUCTS,
  FECTH_PRODUCT_BYSLUG,
} from "./types";

let initialState = {
  products: [],
  product: null,
  featuredProducts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    case FECTH_PRODUCT_BYSLUG:
      return {
        ...state,
        product: action.payload,
      };

    case FECTH_FEATURED_PRODUCTS:
      return {
        ...state,
        featuredProducts: action.payload,
      };

    default:
      return state;
  }
}
