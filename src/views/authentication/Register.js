import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { FiAlertTriangle } from "react-icons/fi";
import Loader from "react-loader-spinner";
import Swal from "sweetalert2";

import Authentication from "./../../services/authentication";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Login = () => {
  const { errors, register, handleSubmit } = useForm();
  const [authError, setAuthError] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const onSubmit = (data) => {
    if (Object.entries(errors).length === 0) {
      setAuthLoading(true);
      if (data.password !== data.password_confirmation) {
        Swal.fire({ icon: "warning", text: "Passwords do not match" });
      } else {
        Authentication.register(data)
          .then((response) => {
            onCreateAccountRequestVerificationCode(data.email);
          })
          .catch((err) => console.log(err));
      }
    }

    return;
  };

  const onCreateAccountRequestVerificationCode = (email) => {
    Authentication.request_account_verification(email)
      .then((response) => {
        window.location = "/account/verify";
      })
      .catch((err) => console.log(err))
      .finally(() => setAuthLoading(false));
  };

  const ButtonLoader = () => (
    <Loader type="TailSpin" color="#fff" height={30} width={30} />
  );

  useEffect(() => {
    document.title = "Bimmer Monkeys::Customer Register";
  }, []);

  return (
    <Container fluid className="authContainer pt-3">
      <a href="/" className="text-light">
        <u>Go back home</u>
      </a>
      <section
        className="d-flex justify-content-center align-items-center text-center w-100"
        style={{ height: "100%" }}
      >
        <section className="w-100">
          <img
            src={`/images/brand_icon.jpg`}
            alt="Brand logo"
            className="authContainer-brandLogo"
          />

          <Card className="authContainer-card col-lg-3 shadow mt-5 mx-auto">
            <Card.Body>
              <h4 className="text-center font-weight-bolder mb-3">
                Bimmer Monkeys
              </h4>

              <p className="text-center text-muted">Create Account</p>

              <Alert
                variant="danger"
                className={authError ? "d-block" : "d-none"}
                onClose={() => setAuthError(false)}
                dismissible
              >
                <FiAlertTriangle className="mr-2" />
                <small>Ooops! something went wrong, please try again.</small>
              </Alert>

              <Form
                onSubmit={handleSubmit(onSubmit)}
                className="authContainer-form mt-3"
              >
                <Form.Group>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    ref={register({ required: true })}
                    autoFocus
                  />
                  {errors.name && (
                    <small className="text-danger">
                      This field is required
                    </small>
                  )}
                </Form.Group>

                <Form.Group>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    ref={register({ required: true })}
                    autoFocus
                  />
                  {errors.email && (
                    <small className="text-danger">
                      This field is required
                    </small>
                  )}
                </Form.Group>

                <Form.Group>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    ref={register({ required: true })}
                  />
                  {errors.password && (
                    <small className="text-danger">
                      This field is required
                    </small>
                  )}
                </Form.Group>

                <Form.Group>
                  <input
                    type="password"
                    name="password_confirmation"
                    className="form-control"
                    placeholder="Confirm Password"
                    ref={register({ required: true })}
                  />
                  {errors.password_confirmation && (
                    <small className="text-danger">
                      This field is required
                    </small>
                  )}
                </Form.Group>

                <Form.Group>
                  <input
                    type="string"
                    name="contact_number"
                    className="form-control"
                    placeholder="Contact Number"
                    ref={register({ required: true })}
                  />
                  {errors.contact_number && (
                    <small className="text-danger">
                      This field is required
                    </small>
                  )}
                </Form.Group>

                <Form.Group>
                  <textarea
                    type="address"
                    name="address"
                    className="form-control"
                    placeholder="Address"
                    ref={register({ required: true })}
                    cols="30"
                    rows="4"
                  />
                  {errors.address && (
                    <small className="text-danger">
                      This field is required
                    </small>
                  )}
                </Form.Group>

                <div className="text-center">
                  <Button type="submit" variant="primary" size="lg">
                    {authLoading ? <ButtonLoader /> : <small>Continue</small>}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <p className="text-muted mt-3">
            Already have an account? &nbsp;
            <a href="/login">
              <u>register here</u>
            </a>
          </p>
        </section>
      </section>
    </Container>
  );
};

export default Login;
