import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/** Views */
import { Error404 } from "./views/errors";
import { Welcome } from "./views/home";
import { List, Show } from "./views/shop";
import { Login, Register, AccountVerify } from "./views/authentication";

const App = () => {
  let location = window.location;
  return (
    <>
      {location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/account/verify" ? (
        <Navbar />
      ) : (
        ""
      )}

      <div className="min-vh-100">
        <Router>
          <Switch>
            <Route exact={true} path="/" component={Welcome} />

            {/* Account */}
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/register" component={Register} />

            {/* Show */}
            <Route exact={true} path="/shop/" component={List} />
            <Route exact={true} path="/shop/:slug" component={Show} />

            {/* Error pages */}
            <Route default component={Error404} />
          </Switch>
        </Router>
      </div>

      {location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/account/verify" ? (
        <Footer />
      ) : (
        ""
      )}
    </>
  );
};

export default App;
