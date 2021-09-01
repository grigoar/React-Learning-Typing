import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link style={{ "margin-left": "10px" }} to="/stats">
        Stats
      </Link>
      <Link style={{ "margin-left": "10px" }} to="/about">
        About
      </Link>
    </div>
  );
};
export default Navbar;
