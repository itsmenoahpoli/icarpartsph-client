import { combineReducers } from "redux";

import { productReducer } from "./components/products/redux";
import { cartReducer } from "./components/cart/redux";

export default combineReducers({ productReducer, cartReducer });
