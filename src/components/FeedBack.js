import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function FeedBack() {
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
      <div className="row mt-3">
        <div className="col-10">
          <h1 className="h2">Dashboard</h1>
        </div>
      </div>
      <h1>welcome to feedback page</h1>
    </div>
  );
}

export default FeedBack;
