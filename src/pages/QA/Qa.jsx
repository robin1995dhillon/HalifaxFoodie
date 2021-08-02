import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormFields } from "../../libs/useFormFields";
import questions from "../../utils/qas";
import firebase from "firebase";
import "./Qa.css";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useAuthDispatch } from "../../context/auth";
import { log } from "react-lex";

export default function Qa(props) {
  const [fields, setFields] = useFormFields({ answer: "" });
  const [questionAndAnswer, setQuestionAndAnswer] = useState({});
  const [userNamePayload, setUserNamePayload] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useAuthDispatch();
  const idToken = history.location.state;

  useEffect(() => {
    onLoad();
  }, []);
  // const state = props.location;
  async function onLoad() {
    console.log(idToken);
    if (idToken) {
      try {
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
        const decoded = jwtDecode(idToken);
        const userName = decoded["cognito:username"];
        setUserNamePayload(decoded["cognito:username"]);
        setRole(decoded["custom:role"]);
        console.log(userName);
        const dataRef = db.collection("user-data").doc(userName);
        const d = await dataRef.get();
        // console.log(d.data());
        // console.log(d);
        if (!d.exists) {
          console.log("Back to the login!!");
          history.push("/login");
        } else {
          let st = {};
          st.question = questions[d.data()["questionNumber"]];
          st.answer = d.data().answer;
          setQuestionAndAnswer(st);
          console.log(d.data());
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      history.push("/login");
    }
  }

  const validateInput = () => {
    return fields.answer.length > 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      fields.answer.toLowerCase() === questionAndAnswer.answer.toLowerCase()
    ) {
      localStorage.setItem("idToken", idToken);
      let payload = {};
      payload.user = userNamePayload;
      payload.role = role;
      // console.log(dispatch);
      dispatch({ type: "LOGIN", payload });
      history.push("/");
    } else {
      localStorage.removeItem("idToken");
      history.push("/login");
    }
  };
  return (
    <div className="QandA">
      <Form onSubmit={handleSubmit}>
        <h2>Answer the following question:</h2>
        <br />
        <Form.Group controlId="answer">
          <Form.Label>{questionAndAnswer.question}</Form.Label>
        </Form.Group>
        <Form.Group controlId="answer">
          <Form.Label>Answer</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            onChange={setFields}
          ></Form.Control>
        </Form.Group>
        <p>{error}</p>
        <Button type="submit" size="lg" block disabled={!validateInput()}>
          Confirm
        </Button>
      </Form>
    </div>
  );
}
