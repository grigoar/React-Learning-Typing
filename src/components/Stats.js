import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TypingWins } from "./App";

export const Stats = () => {
  const { wins } = useContext(TypingWins);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link style={{ "margin-left": "10px" }} to="/stats">
          Stats
        </Link>
        <Link style={{ "margin-left": "10px" }} to="/about">
          About
        </Link>
      </nav>
      <h1>You have {wins} typetouching texts completed. Congratulations!</h1>
      <p>This is the Stats component</p>
    </div>
  );
};
