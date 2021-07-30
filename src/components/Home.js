import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
function Home() {
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
      <h1>Hello World</h1>
    </div>
  );
}

export default Home;
