import React, { useState } from "react";
import { Navbar, Nav, Modal } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import NumberFormat from "react-number-format";

/** Redux */
import { connect, useDispatch } from "react-redux";
import { removeProductToCart } from "./cart/redux";

let APP_URL = "http://localhost:8000";

const MainNav = ({ cart }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar expand="lg" className="mainNav shadow-sm" fixed="top">
        <Navbar.Brand className="font-weight-bold">Bimmer Monkeys</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="text-white"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/shop">Shop</Nav.Link>
            <Nav.Link href="/contect">Contact</Nav.Link>
            <Nav.Link href="/customer/dashboard">My Account</Nav.Link>
            <Nav.Link onClick={() => setShowModal(true)}>
              <FiShoppingCart style={{ fontSize: "24px" }} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)} scrollable>
        <Modal.Header closeButton>
          <h5>Your Cart</h5>
        </Modal.Header>
        <Modal.Body>
          {cart.length > 0 ? (
            <>
              {cart.map((item, index) => (
                <div className="row border-bottom py-3" key={index}>
                  <div className="row container mx-auto">
                    <div className="col-lg-5">
                      <img
                        src={
                          item?.images.length !== 0
                            ? APP_URL + item?.images[0].path
                            : "/images/empty-image.png"
                        }
                        alt="Featured product"
                        className="img-fluid"
                      />

                      <button
                        type="button"
                        className="btn btn-link btn-sm"
                        onClick={() => dispatch(removeProductToCart(index))}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="col-lg-7 pl-4">
                      <div className="productDetailsContainer">
                        <p
                          className="font-weight-bold"
                          style={{ overflow: "hidden" }}
                        >
                          {item?.name}
                        </p>

                        <small>Quantity</small>
                        <p className="text-muted">{item?.qty}</p>

                        <NumberFormat
                          value={parseInt(item?.price) * parseInt(item?.qty)}
                          displayType={"text"}
                          thousandSeparator={true}
                          fixedDecimalScale={true}
                          prefix={"₱ "}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-center text-muted">Your cart is empty</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            disabled={cart.length === 0 ? true : false}
          >
            Checkout
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapState = (state) => ({
  cart: state.cartReducer.cart,
});

const mapDispatch = {
  removeProductToCart,
};

export default connect(mapState, mapDispatch)(MainNav);
