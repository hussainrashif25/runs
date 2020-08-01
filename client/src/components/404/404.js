import React from "react";
import {Link} from "react-router-dom";

const NotFound = props => {
    return (
        <div className="not-found">
            <Link to="/dashboard">
                <b>404</b>
            </Link>
            <br/>
            <p>The requested page was not found on our server.</p>
        </div>
    );
};

export default NotFound;