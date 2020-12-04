import { ADD_PRODUCT, REMOVE_PRODUCT, RESET_CART } from "./types";

let initialState = {
  cart: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      let currentCart = [...state.cart];

      let checkIfExistingIndex = currentCart.findIndex(
        (cart) => cart.name === action.payload.name
      );

      if (checkIfExistingIndex != -1) {
        currentCart[checkIfExistingIndex].price =
          currentCart[checkIfExistingIndex].price * action.payload.qty;

        currentCart[checkIfExistingIndex].qty =
          parseInt(currentCart[checkIfExistingIndex].qty) +
          parseInt(action.payload.qty);

        return {
          ...state,
          cart: currentCart,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }

    case REMOVE_PRODUCT:
      let oldCart = [...state.cart];
      oldCart.splice(action.payload, 1);
      return {
        ...state,
        cart: oldCart,
      };

    case RESET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
}
