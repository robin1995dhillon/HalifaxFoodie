import { Auth } from "aws-amplify";
import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
    } catch (e) {
      console.log(e);
      history.push("/login");
    }
  }
  return (
    <div className="Home">
      <div className="lander">
        <h1>FoodApp</h1>
        <p className="text-muted">Food Delivery App</p>
      </div>
    </div>
  );
}
