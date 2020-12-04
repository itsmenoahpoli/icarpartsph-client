import React, { useState, useEffect } from "react";
import { Container, Card, Modal } from "react-bootstrap";
import NumberFormat from "react-number-format";
import AuthMiddleware from "./../../middlewares/authentication";
import Authentication from "./../../services/authentication";
import Cart from "./../../services/cart";
import Moment from "react-moment";

let APP_URL = "http://localhost:8000";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = "Bimmer Monkeys::My Orders";

    if (!AuthMiddleware.isAuthenticated()) {
      window.location = "/";
    }
  }, []);

  const getMyOrders = () => {
    Cart.orders_byuser(Authentication.getUserData().id)
      .then((response) => {
        setMyOrders(response);
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  const viewCartItems = (items) => {
    setShowModal(true);
    setItems(items);
  };

  const OrdersContainer = ({ orders }) =>
    orders.map((order, index) => (
      <OrdersContainerItem key={index} index={index} order={order} />
    ));

  const OrdersContainerItem = ({ order }) => (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <div className="d-flex align-items-baseline">
          <h5># {order.reference_id}</h5>

          <small className="ml-auto">
            {
              <Moment format={"MMMM D, YYYY"}>
                {new Date(order.created_at)}
              </Moment>
            }
          </small>
        </div>

        <div className="mb-2">
          <h6>Delivery Address</h6>
          <div className="bg-light border rounded text-muted p-2">
            {Authentication.getUserData().address}
          </div>
        </div>

        <div className="mb-2">
          <h6>Total # of items</h6>
          <div className="bg-light border rounded text-muted p-2">
            {JSON.parse(order.items).length}
          </div>
        </div>

        <div className="mb-2">
          <h6>Subtotal</h6>
          <div className="bg-light border rounded text-muted p-2">
            <NumberFormat
              value={order.subtotal}
              displayType={"text"}
              thousandSeparator={true}
              fixedDecimalScale={true}
              prefix={"₱ "}
            />
          </div>
        </div>

        <div className="mb-2">
          <h6>Status</h6>
          <div className="bg-light border rounded text-muted p-2">
            {order.status}
          </div>
        </div>

        <button
          className="btn btn-info"
          onClick={() => viewCartItems(JSON.parse(order.items))}
        >
          <small>View Items</small>
        </button>
      </Card.Body>
    </Card>
  );

  const CartItem = ({ item }) => (
    <div className="row pb-3 border-bottom">
      <div className="col-lg-6">
        <img
          src={
            item?.images.length !== 0
              ? APP_URL + item?.images[0].path
              : "/images/empty-image.png"
          }
          alt="Featured product"
          className="img-fluid"
        />
      </div>

      <div className="col-lg-6">
        <small>Name</small>
        <p className="mb-1">{item.name}</p>

        <small>Price</small>
        <p className="mb-1">{item.price}</p>

        <small>Quantity</small>
        <p className="mb-1">{item.quantity}</p>

        <small>Total</small>
        <p className="mb-1">{parseInt(item.price) * parseInt(item.qty)}</p>
      </div>
    </div>
  );

  return (
    <Container className="dashboardContainer">
      <h2 className="mb-4">My Orders</h2>

      <hr />

      <OrdersContainer orders={myOrders} />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>Order Items</Modal.Header>
        <Modal.Body>
          {items.map((item, index) => (
            <CartItem item={item} index={index} key={index} />
          ))}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MyOrders;
