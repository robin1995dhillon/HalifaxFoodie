import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Review() {
  const history = useHistory();
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    if (!localStorage.getItem("idToken")) {
      history.push("/login");
    }
  }
  return (
    <div>
      <h1>welcome to review page</h1>
    </div>
  );
}

export default Review;
