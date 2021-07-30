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
import DataProcessing from './components/DataProcessing';
import LiveChat from './components/LiveChat';
import RepresentativeChat from './components/RepresentativeChat';
import ManagerChat from './components/ManagerChat';
import ManagerCustomer from './components/ManagerToCustomer';
import RepresentativeCustomer from './components/RepToCust';


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
      <Route exact path ="/wordcloud">
         <DataProcessing/>
      </Route>
      <Route exact path ="/livechat">
         <LiveChat/>
      </Route>
      <Route exact path ="/representativechat">
         <RepresentativeChat/>
      </Route>
      <Route exact path ="/managerchat">
         <ManagerChat/>
      </Route>
      <Route exact path ="/managercustomer">
         <ManagerCustomer/>
      </Route>
      <Route exact path ="/representativecustomer">
         <RepresentativeCustomer/>
      </Route>
     </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
