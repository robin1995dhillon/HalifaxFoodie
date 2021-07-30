import React from 'react'
import {Link} from "react-router-dom"


function SideBar() {
    return (
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
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
                <li>
                    <Link to="/wordcloud">Wordcloud</Link>
                </li>
                <li>
                    <Link to="/livechat">Live Chat</Link>
                </li>
            </ul>
        </div>
    )
}

export default SideBar
