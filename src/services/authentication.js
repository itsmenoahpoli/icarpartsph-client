import apiUrl from "./../api";
import Cookie from "js-cookie";

import axios from "axios";

export default {
  async login(credentials) {
    let response = await axios.post(`${apiUrl}/auth/login`, credentials);
    return response;
  },

  async register(data) {
    console.log(data);
    let repsonse = await axios.post(`${apiUrl}/auth/register`, data);
    return repsonse.data;
  },

  async request_account_verification(email) {
    let repsonse = await axios.post(
      `${apiUrl}/mails/send/verifications/account`,
      { email: email }
    );
    return repsonse.data;
  },

  async account_verify_verifiation_code(verification_code) {
    let repsonse = await axios.post(`${apiUrl}/verifications/verify`, {
      verification_code: verification_code,
    });
    return repsonse.data;
  },

  getUserData() {
    let data = Cookie.get("user");
    return JSON.parse(data);
  },

  logout() {
    Cookie.remove("user");
    Cookie.remove("accessToken");

    window.location = "/login";
  },
};
