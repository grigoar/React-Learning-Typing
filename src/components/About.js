import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link style={{ marginLeft: "10px" }} to="/stats">
          Stats
        </Link>
        <Link style={{ marginLeft: "10px" }} to="/about">
          About
        </Link>
      </nav>
      <p>This is the About component</p>
    </div>
  );
};

export default About;
