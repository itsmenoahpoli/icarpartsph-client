import Cookie from "js-cookie";

export default {
  getAccessToken() {
    return Cookie.get("accessToken");
  },

  apiHeadersConfig() {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
    };
  },
};
