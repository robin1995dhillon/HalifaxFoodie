import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "../context/auth";

function SideBar() {
  let previewData;
  const { role, user } = useAuthState();
  console.log(user);
  console.log(role);
  if (user) {
    previewData =
      role == "owner" ? (
        <div id="sidebar">
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/onlinesupport">OnlineSupport</Link>
            </li>
            <li>
              <Link to="/feedback">FeedBack</Link>
            </li>
            <li>
              <Link to="/review">Ratings</Link>
            </li>
            {/* <li>
              <Link to="/logout">Logout</Link>
            </li> */}
            <li>
              <Link to="/wordcloud">Wordcloud</Link>
            </li>
            <li>
              <Link to="/managercustomer">Chat with customer</Link>
            </li>
          </ul>
        </div>
      ) : (
        <div id="sidebar">
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/onlinesupport">OnlineSupport</Link>
            </li>
            <li>
              <Link to="/feedback">FeedBack</Link>
            </li>
            <li>
              <Link to="/review">Ratings</Link>
            </li>
            {/* <li>
                  <Link to="/logout">Logout</Link>
              </li> */}
            <li>
              <Link to="/livechat">Live Chat</Link>
            </li>
          </ul>
        </div>
      );
  } else {
    previewData = null;
  }

  return previewData;
}

export default SideBar;
