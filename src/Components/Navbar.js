import React from "react";

import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="header">
      <div className="navlinks">
        <Link className="nav-link active text" to="/Dashboard">
          Dashboard
        </Link>
        <Link className="nav-link active text" aria-current="page" to="/offers">
          Offers
        </Link>
      </div>
      <div className="navlinks">
        <Link className="nav-link active text" to="/AppDemo">
          App demo
        </Link>
        <Link className="nav-link active text" to="/ContactUs">
          Contact us
        </Link>
        <img src="path/to/your/image.png" alt="Logo" className="navbar-image" />
      </div>
    </div>
  );
};
export default Navbar;
