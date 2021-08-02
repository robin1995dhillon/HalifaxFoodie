import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuthDispatch } from "../../context/auth";
import { useFormFields } from "../../libs/useFormFields";
import questions from "../../utils/qas";
import firebase from "firebase";

export default function OwnerSignup() {
  const [fields, setFields] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    answer: "",
  });
  const [question, setQuestion] = useState("Select a question!");
  const [error, setError] = useState("");
  const dispatch = useAuthDispatch();
  const history = useHistory();

  const handleSelect = (eventKey, event) => {
    console.log(eventKey);
    setQuestion(questions[eventKey]);
  };

  const validateQuestion = () => {
    if (question === "Select a question!") {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://ni15wn2vq3.execute-api.us-east-1.amazonaws.com/test/signup",
        {
          userName: fields.userName,
          password: fields.password,
          email: fields.email,
          role: "owner",
        }
      );
      // console.log(fields.password);
      // const data = await Auth.signIn(fields.email, fields.password);
      const body = JSON.parse(res.data.body);
      if (res.data.statusCode === 200) {
        // localStorage.setItem("idToken", tokens.idToken);
        // console.log(decodedData);
        if (firebase.apps.length === 0) {
          firebase.initializeApp({
            apiKey: "AIzaSyAfm2RDn6znhCRCUz2xQ70J3muEpkfFAVc",
            authDomain: "serverlesspro.firebaseapp.com",
            projectId: "serverlesspro",
          });
        } else {
          firebase.app();
        }
        let db = firebase.firestore();
        const qData = {
          questionNumber: questions.indexOf(question),
          answer: fields.answer,
        };
        db.collection("user-data").doc(fields.userName).set(qData);
        // history.push({ pathname: "/login", state: body.idToken });
        history.push({ pathname: "/confirm-email", state: fields.userName });
        // history.push("/");
      } else {
        console.log("Invalid creds!");
      }
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  };

  const validateInput = () => {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.confirmPassword.length > 0 &&
      fields.userName.length > 0 &&
      fields.answer.length > 0 &&
      fields.password === fields.confirmPassword
    );
  };

  return (
    <div className="Signup">
      <Form onSubmit={handleSubmit}>
        <h2>Owner Signup</h2>
        <Form.Group controlId="userName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            onChange={setFields}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
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
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            autoFocus
            type="password"
            onChange={setFields}
          ></Form.Control>
        </Form.Group>
        <p>{error}</p>
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-button-dark-example1"
            variant="secondary"
          >
            {question}
          </Dropdown.Toggle>

          <Dropdown.Menu variant="dark">
            <Dropdown.Item eventKey="0" onSelect={handleSelect} active>
              What is your favourite food?
            </Dropdown.Item>
            <Dropdown.Item onSelect={handleSelect} eventKey="1">
              Who is your best friend?
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onSelect={handleSelect}>
              What was the name of your first pet?
            </Dropdown.Item>
            <Dropdown.Item eventKey="3" onSelect={handleSelect}>
              Who are you?
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <br />
        <Form.Group controlId="answer">
          <Form.Label>Answer</Form.Label>
          <Form.Control
            disabled={!validateQuestion()}
            autoFocus
            type="text"
            onChange={setFields}
          ></Form.Control>
        </Form.Group>
        <br />
        <Button type="submit" size="lg" block disabled={!validateInput()}>
          Signup
        </Button>
      </Form>
    </div>
  );
}
