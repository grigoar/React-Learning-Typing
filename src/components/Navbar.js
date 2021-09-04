import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Typing</Link>
      <Link to="/stats">Stats</Link>
      <Link to="/about">About</Link>
    </nav>
  );
};
export default Navbar;
