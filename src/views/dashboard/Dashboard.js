import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import AuthMiddleware from "./../../middlewares/authentication";
import Authentication from "./../../services/authentication";

import ProfileContainer from "./../../components/dashboard/ProfileContainer";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Bimmer Monkeys::Customer Dashboard";

    if (!AuthMiddleware.isAuthenticated()) {
      window.location = "/";
    }
  }, []);

  return (
    <Container className="dashboardContainer">
      <h2 className="mb-5">My Information</h2>

      <hr />

      <ProfileContainer user={Authentication.getUserData()} />

      <hr />
    </Container>
  );
};

export default Dashboard;
