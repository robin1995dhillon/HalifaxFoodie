import { Auth } from "aws-amplify";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuthDispatch } from "../../context/auth";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAuthDispatch();
  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(password);
      const data = await Auth.signIn(email, password);
      let payload = {};
      payload.user = data.username;
      dispatch({ type: "LOGIN", payload });
      history.push("/");
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  };

  const validateInput = () => {
    return email.length > 0 && password.length > 0;
  };

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            autoFocus
            type="password"
            onChange={(e) => setPassword(e.target.value)}
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
