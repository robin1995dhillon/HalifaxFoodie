import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuthDispatch } from "../../context/auth";
import { useFormFields } from "../../libs/useFormFields";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./Login.css";

export default function Login() {
  const [fields, setFields] = useFormFields({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useAuthDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://ni15wn2vq3.execute-api.us-east-1.amazonaws.com/test/user",
        { userName: fields.email, password: fields.password }
      );
      // console.log(fields.password);
      // const data = await Auth.signIn(fields.email, fields.password);
      if (res.data.statusCode === 200) {
        const tokens = JSON.parse(res.data.body);
        console.log(tokens);
        // localStorage.setItem("idToken", tokens.idToken);
        const decodedData = jwt_decode(tokens.idToken);
        console.log(decodedData);
        history.push({ pathname: "/login/qa", state: tokens.idToken });
        // history.push("/");
      } else {
        setError("Invalid creds!");

        console.log(res);
      }
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  };

  const validateInput = () => {
    return fields.email.length > 0 && fields.password.length > 0;
  };

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Form.Group controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            onChange={setFields}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            autoFocus
            type="password"
            onChange={setFields}
          ></Form.Control>
        </Form.Group>
        <p>{error}</p>
        <Button type="submit" size="lg" block disabled={!validateInput()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
