import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import axios from 'axios';
import 'react-chat-widget/lib/styles.css';
import {Link} from "react-router-dom"

class LiveChat extends Component {
  

  render() {
    return (
      <div className="LiveChat">
       <h1>Welcome to our Live Chat page</h1>
       <h5>Start chatting with our agents by clicking the chat widget below</h5>
        
                    <Link to="/representativechat">Representative</Link>
               <a>     </a>
                    <Link to="/managerchat">Manager</Link>
                
      </div>
    );
  } 
}

export default LiveChat;