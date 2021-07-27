import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import SideBar from './components/SideBar';
import FeedBack from './components/FeedBack';
import Review from './components/Review';
import Logout from './components/Logout';
import {BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar';
import OnlineSupport from './components/OnlineSupport';

function App() {
  return (
    <div className="App">
      
     <BrowserRouter>
     <NavBar/>
     <SideBar/>
     <Switch>      
       <Route exact path ="/">
         <Home/>
      </Route>
      <Route exact path ="/home">
         <Home/>
      </Route>
      <Route exact path ="/feedback">
         <FeedBack/>
      </Route>
      <Route exact path ="/review">
         <Review/>
      </Route>
      <Route exact path ="/logout">
         <Logout/>
      </Route>
      <Route exact path ="/onlinesupport">
         <OnlineSupport/>
      </Route>
     </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
