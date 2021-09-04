import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Typing</Link>
      <Link style={{ marginLeft: "10px" }} to="/stats">
        Stats
      </Link>
      <Link style={{ marginLeft: "10px" }} to="/about">
        About
      </Link>
    </div>
  );
};
export default Navbar;
