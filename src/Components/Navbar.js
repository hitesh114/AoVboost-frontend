import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="header">
      <div className="navlinks">
        <Link className="nav-link active text" to="/Dashboard">
          <i className="bi bi-columns"></i>
          Dashboard
        </Link>
        <Link className="nav-link active text" aria-current="page" to="/offers">
          <i className="bi bi-tag"></i>
          Offers
        </Link>
      </div>
      <div className="navlinks">
        <Link className="nav-link active text" to="/AppDemo">
          <i className="bi bi-info-circle"></i>
          App demo
        </Link>
        <Link className="nav-link active text" to="/ContactUs">
          <i className="bi bi-envelope"></i>
          Contact us
        </Link>
        <img src="path/to/your/image.png" alt="Logo" className="navbar-image" />
      </div>
    </div>
  );
};
export default Navbar;
