import Cookie from "js-cookie";

export default {
  /** Check if authenticated */
  isAuthenticated() {
    let accessToken = Cookie.get("accessToken");
    return typeof accessToken !== "undefined" ? true : false;
  },
};
