import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const { errors, register, handleSubmit } = useForm();

  const onSubmit = (credentials) => {
    if (Object.entries(errors).length === 0) {
      console.log(credentials);
    }
  };

  return <Form></Form>;
};

export default LoginForm;
