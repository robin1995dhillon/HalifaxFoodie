import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import axios from 'axios';
import 'react-chat-widget/lib/styles.css';

let oldMsg = "";
let myoldMsg = "";
let type = "customer";
let rType = "representative";
class RepresentativeChat extends Component {
  
  componentDidMount() {  
     addResponseMessage("Welcome to live chat, one of our representative agents will soon. In the meanwhile, type your concern!");    
  }

  
 
  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
   axios.post('https://mychat-lx27w3oqvq-uc.a.run.app', {
    "message":`${newMessage}`,
    "userType":`${type}`,
    "reqType":`${rType}`
})
        .then(res => {
          myoldMsg = newMessage;
          console.log(res);
        })
        .catch(err => console.log(err))

     setInterval(function(){ 
   axios.post('https://subscriber-lx27w3oqvq-uc.a.run.app', {
    "subName": "projects/csci-5410-316618/subscriptions/customer-representative",
    "userType": "customer",
    "reqType": `${rType}`
  })
        .then(res => {
          console.log("got ",res.data);
          console.log("my msg ",myoldMsg);
          console.log("end here");
          if(oldMsg!=res.data && res.data!=myoldMsg && oldMsg!=myoldMsg){
            oldMsg=res.data;
          addResponseMessage(res.data);
          }
        })
        .catch(err => console.log(err)) 
}, 3000);  
  }

  render() {
    return (
      <div className="RepresentativeChat">
       <h1>Welcome to our Live Chat page</h1>
       <h5>Start chatting with one of our representative agents by clicking the chat widget below</h5>
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          //profileAvatar={logo}
          title="Halifax Foodie"
          subtitle="Live chat"
        />
      </div>
    );
  } 
}

export default RepresentativeChat;