import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuthDispatch } from "../../context/auth";
import { useFormFields } from "../../libs/useFormFields";
import axios from "axios";
import "./ConfirmationCode.css";

export default function ConfirmationCode() {
  const [fields, setFields] = useFormFields({ confirmationCode: "" });
  const [error, setError] = useState("");
  const dispatch = useAuthDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userName = history.location.state;
      const res = await axios.post(
        "https://ni15wn2vq3.execute-api.us-east-1.amazonaws.com/test/confirm-code",
        { confirmationCode: fields.confirmationCode, userName }
      );
      // console.log(fields.password);
      // const data = await Auth.signIn(fields.email, fields.password);
      if (res.data.statusCode === 200) {
        history.push("/login");
        // history.push("/");
      } else {
        setError("Wrong code!");
        console.log(res);
      }
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  };

  const validateInput = () => {
    return fields.confirmationCode.length > 0;
  };

  return (
    <div className="ConfirmPage">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="confirmationCode">
          <Form.Label>
            Enter the confirmation code sent to your email here:
          </Form.Label>
          <Form.Control
            autoFocus
            type="text"
            onChange={setFields}
          ></Form.Control>
        </Form.Group>
        <p>{error}</p>
        <Button type="submit" size="lg" block disabled={!validateInput()}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
