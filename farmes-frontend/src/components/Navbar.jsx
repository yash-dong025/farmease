import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // optional styling file

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">FarmEase</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
