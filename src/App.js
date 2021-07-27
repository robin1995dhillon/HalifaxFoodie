import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useAuthDispatch } from "./context/auth";

function App() {
  const dispatch = useAuthDispatch();
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const data = await Auth.currentSession();
      console.log(data.getIdToken().payload["cognito:username"]);
      let payload = {};
      payload.user = data.getIdToken().payload["cognito:username"];
      dispatch({ type: "LOGIN", payload });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
