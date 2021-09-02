import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { TypingWins } from "./App";
// import WinProvider from "./customContext/WinsProvider";
// import { WinContext } from "./customContext/WinsProvider";
import { useContextWins } from "./customContext/WinsProvider";

export const Stats = () => {
  // const { wins } = useContext(WinContext);
  const { wins } = useContextWins();

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
      <h1>
        You have {wins} touch typing texts completed.{" "}
        {wins > 0 ? "Congratulations" : "Go try and finish some texts"}!
      </h1>
      <p>This is the Stats component</p>
    </div>
  );
};
