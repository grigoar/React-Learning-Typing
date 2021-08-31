import React from "react";
import { Link } from "react-router-dom";

export const Stats = () => {
  return (
    <div>
      <p>This is the Stats component</p>
      <Link to="/">Home</Link>
      <Link to="/stats">Stats</Link>
      <Link to="/about">About</Link>
    </div>
  );
};
