import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Cookie from "js-cookie";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import Authentication from "./../../services/authentication";
import Cart from "./../../services/cart";
import CartContainerItem from "./CartContainerItem";

/** Redux */
import { connect, useDispatch } from "react-redux";
import {
  removeProductToCart,
  resetProductCart,
} from "./../../components/cart/redux";

const CartContainer = ({ cart }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  let user_id = Authentication.getUserData().id;

  const checkoutMyCart = () => {
    let _subtotal = 0;
    let _totalItemCount = 0;
    for (let i = 0; i < cart.length; i++) {
      _subtotal =
        parseInt(_subtotal) + parseInt(cart[i].qty) * parseInt(cart[i].price);
      _totalItemCount = parseInt(_totalItemCount) + parseInt(cart[i].qty);
    }

    let cartObj = {
      user_id: user_id,
      subtotal: _subtotal,
      itemCount: _totalItemCount,
      items: JSON.stringify(cart),
    };

    Cookie.set("cartData", cartObj);
    getCheckoutCart();
    setShowModal(true);
  };

  const getCheckoutCart = () => {
    let checkoutCardData = JSON.parse(Cookie.get("cartData"));
    return checkoutCardData;
  };

  const confirmCheckout = () => {
    Cart.checkout_cart(getCheckoutCart())
      .then((response) => {
        setShowModal(false);
        Swal.fire({
          icon: "success",
          text: "Your order has been successfully submitted",
        });
        dispatch(resetProductCart());
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="p-2 mx-3">
        <div className="pr-5">
          <small>Actions</small>

          <button
            type="button"
            className="btn btn-light border btn-sm ml-3"
            onClick={() => checkoutMyCart()}
            disabled={cart.length === 0 ? true : false}
          >
            Checkout
          </button>

          <button
            type="button"
            className="btn btn-light border btn-sm ml-3"
            onClick={() => dispatch(resetProductCart())}
          >
            Reset Cart
          </button>
        </div>
      </div>

      <hr />

      {cart.length > 0 ? (
        cart.map((item, index) => (
          <CartContainerItem
            item={item}
            index={index}
            key={index}
            removeProduct={() => dispatch(removeProductToCart(index))}
          />
        ))
      ) : (
        <div className="text-center">
          <div className="col-lg-5 mx-auto">
            <img
              src="/images/empty-cart.png"
              alt="Empty cart logo"
              className="img-fluid"
            />
          </div>
          <h5>No items available</h5>
          <Link to="/shop">
            <u>Go to shop</u>
          </Link>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>Order Checkout</Modal.Header>

        <Modal.Body>
          <div className="mb-2">
            <h6>Delivery Address</h6>
            <div className="bg-light border rounded text-muted p-2">
              {Authentication.getUserData().address}
            </div>
          </div>

          <div className="mb-2">
            <h6>Total # of items</h6>
            <div className="bg-light border rounded text-muted p-2">
              {getCheckoutCart().itemCount}
            </div>
          </div>

          <div className="mb-2">
            <h6>Subtotal</h6>
            <div className="bg-light border rounded text-muted p-2">
              <NumberFormat
                value={getCheckoutCart().subtotal}
                displayType={"text"}
                thousandSeparator={true}
                fixedDecimalScale={true}
                prefix={"₱ "}
              />
            </div>
          </div>

          <small className="text-muted mb-0">* Note</small>
          <p>
            All order payments will be Cash-On-Delivery basis only as our bank
            payments are still not available as of the moment, Thank you!
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => confirmCheckout()}>
            <small>Confirm</small>
          </Button>
          <Button
            variant="light"
            className="border"
            onClick={() => setShowModal(false)}
          >
            <small>Cancel</small>
          </Button>
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
  resetProductCart,
};

export default connect(mapState, mapDispatch)(CartContainer);
