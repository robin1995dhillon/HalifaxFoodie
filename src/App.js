import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import SideBar from "./components/SideBar";
import FeedBack from "./components/FeedBack";
import Review from "./components/Review";
import Logout from "./components/Logout";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import OnlineSupport from "./components/OnlineSupport";
import DataProcessing from "./components/DataProcessing";
import Login from "./pages/Login/Login";
import Qa from "./pages/QA/Qa";
import Signup from "./pages/Signup/Signup";
import ConfirmationCode from "./pages/ConfrimationCode/ConfirmationCode";
import NavbarComponent from "./components/Navbar2";
import { useAuthDispatch } from "./context/auth";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import OwnerSignup from "./pages/OwnerSignup/OwnerSignup";
// import Test from './components/Test';

function App() {
  const dispatch = useAuthDispatch();
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const idToken = localStorage.getItem("idToken");
      if (idToken) {
        // const data = await Auth.currentSession();
        const decodedData = jwtDecode(idToken);
        console.log(decodedData["cognito:username"]);
        let payload = {};
        payload.user = decodedData["cognito:username"];
        dispatch({ type: "LOGIN", payload });
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent />
        <SideBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/feedback">
            <FeedBack />
          </Route>
          <Route exact path="/review">
            <Review />
          </Route>
          {/* <Route exact path ="/logout">
         <Test/>
      </Route> */}
          <Route exact path="/onlinesupport">
            <OnlineSupport />
          </Route>
          <Route exact path="/wordcloud">
            <DataProcessing />
          </Route>
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/owner-signup" component={OwnerSignup} />
          <Route exact path="/login/qa" component={Qa} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/confirm-email" component={ConfirmationCode} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
