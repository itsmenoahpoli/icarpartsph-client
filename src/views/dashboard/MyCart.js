import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import AuthMiddleware from "./../../middlewares/authentication";
import Cart from "./../../services/cart.js";

import CartContainer from "./../../components/dashboard/CartContainer";

const MyCart = () => {
  useState(() => {
    document.title = "Bimmer Monkeys::Customer Cart";

    if (!AuthMiddleware.isAuthenticated()) {
      window.location = "/";
    }
  }, []);

  return (
    <Container className="dashboardContainer">
      <h2 className="mb-4">My Cart</h2>

      <CartContainer />
    </Container>
  );
};

export default MyCart;
