import React from "react";
import ReactDOM from "react-dom";
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
//import "/bootstrap/dist/css/bootstrap.min.css";
//import "./styles.css";
import LexChat from "react-lex";
import AWS from 'aws-sdk';

AWS.config.update({
  region: "us-west-2",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:eb38b25b-bc10-465c-9cb4-f5185318d6cd"
  })
});



function OnlineSupport() {
  
  return (
    <div>
      <h1>Welcome to Online Support.</h1>
      <h2> We are happy to assit you</h2>
     <LexChat
      botName="OnlineSupport"
      IdentityPoolId="us-east-1:eb38b25b-bc10-465c-9cb4-f5185318d6cd"
      placeholder="Placeholder text"
      backgroundColor="#282c34"
      //backgroundColor="#cdd4d686"
      //border= "10px solid black " 
      height="430px"
      region="us-east-1"
      headerText="Halifax Foodie"
      headerStyle={{ backgroundColor:"#ABD5D9", fontSize: "10px" }}
      
    />
      
    </div>
  );
}

ReactDOM.render(<OnlineSupport version="1" />, document.getElementById("root"));

export default OnlineSupport;