import userEvent from "@testing-library/user-event";
import React from "react";
import { Container } from "react-bootstrap";

const ProfileContainer = ({ user }) => {
  return (
    <Container className="px-0">
      <div className="mb-2">
        <p className="font-weight-bolder">Name</p>
        <h4>{user.name}</h4>
      </div>

      <div className="mb-2">
        <p className="font-weight-bolder">Email</p>
        <h4>{user.email}</h4>
      </div>

      <div className="mb-2">
        <p className="font-weight-bolder">Contact Number</p>
        <h4>{user.contact_number}</h4>
      </div>

      <div className="mb-2">
        <p className="font-weight-bolder">Address</p>
        <h4>{user.address}</h4>
      </div>

      <div className="mb-2">
        <p className="font-weight-bolder">Email</p>
        <h4>{user.email}</h4>
      </div>
    </Container>
  );
};

export default ProfileContainer;
