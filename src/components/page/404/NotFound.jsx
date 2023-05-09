import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not_found">
      <div className="number">404</div>
      <div className="text">
        <span>Ooops...</span>
        <br />
        page not found
      </div>
      <Link to="/" className="button">
        Home
      </Link>
    </div>
  );
};

export default NotFound;
