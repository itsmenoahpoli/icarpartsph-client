import React from "react";
import { Container } from "react-bootstrap";
import HomeCarousel from "./../../components/HomeCarousel";
import FeaturedProducts from "./../../components/products/FeaturedProducts";

const Welcome = () => {
  return (
    <>
      <HomeCarousel />

      <Container className="mt-5">
        <h1 className="font-weight-bold">Featured Products</h1>

        <FeaturedProducts />
      </Container>

      <div className="min-vh-100"></div>
    </>
  );
};

export default Welcome;
