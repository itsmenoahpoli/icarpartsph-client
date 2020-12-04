import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { FiAlertTriangle } from "react-icons/fi";
import Loader from "react-loader-spinner";
import Cookie from "js-cookie";

import Authentication from "./../../services/authentication";
import Config from "./../../middlewares/config";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Login = () => {
  const { errors, register, handleSubmit } = useForm();
  const [success, setSuccess] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const onSubmit = (verification_code) => {
    setAuthError(false);
    if (Object.entries(errors).length === 0) {
      setAuthLoading(true);
      Authentication.account_verify_verifiation_code(verification_code)
        .then((response) => {
          setSuccess(true);
        })
        .catch((err) => setAuthError(true));
    }

    return;
  };

  const ButtonLoader = () => (
    <Loader type="TailSpin" color="#fff" height={30} width={30} />
  );

  const SuccessContainer = () => (
    <div className="text-center text-white py-5">
      <div className="col-6 mx-auto mb-4">
        <img
          src="/images/success.png"
          alt="Success logo"
          className="img-fluid"
        />
      </div>

      <a href="/dashboard">Proceed to your dashboard</a>
    </div>
  );

  useEffect(() => {
    document.title = "Bimmer Monkeys::Account Verification";
  }, []);

  return (
    <Container fluid className="authContainer pt-3">
      <a href="/" className="text-light">
        <u>Go back home</u>
      </a>
      <section
        className="d-flex justify-content-center align-items-center text-center w-100"
        style={{ height: "80vh" }}
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
                {success ? "Account Verified Successfully" : "Bimmer Monkeys"}
              </h4>

              {success ? (
                <SuccessContainer />
              ) : (
                <>
                  <p className="text-muted">
                    A verification code was sent to your email account, this
                    step is needed to complete your registration.
                  </p>

                  <Alert
                    variant="danger"
                    className={authError ? "d-block" : "d-none"}
                    onClose={() => setAuthError(false)}
                    dismissible
                  >
                    <FiAlertTriangle className="mr-2" />
                    <small>Invalid verification code, please try again.</small>
                  </Alert>

                  <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="authContainer-form mt-3"
                  >
                    <Form.Group>
                      <input
                        type="text"
                        name="verification_code"
                        className="form-control"
                        placeholder="Code"
                        ref={register({ required: true })}
                        autoFocus
                      />
                      {errors.verification_code && (
                        <small className="text-danger">
                          This field is required
                        </small>
                      )}
                    </Form.Group>

                    <div className="text-center">
                      <Button type="submit" variant="primary" size="lg">
                        {authLoading ? <ButtonLoader /> : <small>Submit</small>}
                      </Button>
                    </div>
                  </Form>
                </>
              )}
            </Card.Body>
          </Card>

          <p className="text-muted mt-3">
            Doesn't have an account? &nbsp;
            <a href="/register">
              <u>register here</u>
            </a>
          </p>
        </section>
      </section>
    </Container>
  );
};

export default Login;
