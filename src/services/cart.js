import apiUrl from "./../api";

import axios from "axios";
import Config from "./../middlewares/config";

export default {
  async checkout_cart(cart) {
    let response = await axios.get(`${apiUrl}/orders`, cart, {
      headers: Config.apiHeadersConfig(),
    });
    return response.data;
  },

  async orders_byuser(id) {
    let response = await axios.get(`${apiUrl}/orders-byuser/${id}`, {
      headers: Config.apiHeadersConfig(),
    });
    return response.data;
  },
};
