import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import AuthMiddleware from "./../../middlewares/authentication";
import Authentication from "./../../services/authentication";
import Cart from "./../../services/cart";
import Moment from "react-moment";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);

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

  const OrdersContainer = ({ orders }) =>
    orders.map((order, index) => (
      <OrdersContainerItem key={index} index={index} order={order} />
    ));

  const OrdersContainerItem = ({ order }) => (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        {console.log(order)}
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
      </Card.Body>
    </Card>
  );

  return (
    <Container className="dashboardContainer">
      <h2 className="mb-4">My Orders</h2>

      <hr />

      <OrdersContainer orders={myOrders} />
    </Container>
  );
};

export default MyOrders;
