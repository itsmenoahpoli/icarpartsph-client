import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthMiddleware from "./../../middlewares/authentication";
import Authentication from "./../../services/authentication";

import ProfileContainer from "./../../components/dashboard/ProfileContainer";

const Dashboard = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = "Bimmer Monkeys::Customer Dashboard";

    if (!AuthMiddleware.isAuthenticated()) {
      history.push("/shop");
    }
  }, []);

  return (
    <Container className="dashboardContainer">
      <h2 className="mb-5">My Information</h2>

      <hr />

      {AuthMiddleware.isAuthenticated() ? (
        <ProfileContainer user={Authentication.getUserData()} />
      ) : null}

      <hr />
    </Container>
  );
};

export default Dashboard;
