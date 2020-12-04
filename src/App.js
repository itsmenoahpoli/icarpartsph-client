import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/** Views */
import { Error404 } from "./views/errors";
import { Welcome } from "./views/home";
import { List, Show } from "./views/shop";
import { Login, Register, AccountVerify } from "./views/authentication";
import { Dashboard, MyCart, MyOrders } from "./views/dashboard";

const App = () => {
  let location = window.location;
  return (
    <>
      <Router>
        {location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/account/verify" ? (
          <Navbar />
        ) : (
          ""
        )}

        <div className="min-vh-100">
          <Switch>
            <Route exact={true} path="/" component={List} />

            {/* Account */}
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/register" component={Register} />
            <Route
              exact={true}
              path="/account/verify"
              component={AccountVerify}
            />

            {/* Dashboard */}
            <Route exact={true} path="/dashboard" component={Dashboard} />
            <Route exact={true} path="/my-cart" component={MyCart} />
            <Route exact={true} path="/my-orders" component={MyOrders} />

            {/* Shop */}
            <Route exact={true} path="/shop" component={List} />
            <Route exact={true} path="/shop/:slug" component={Show} />

            {/* Error pages */}
            <Route route="*" component={Error404} />
          </Switch>
        </div>

        {/* {location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/account/verify" ? (
          <Footer />
        ) : (
          ""
        )} */}
      </Router>
    </>
  );
};

export default App;
