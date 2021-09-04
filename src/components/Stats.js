import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { TypingWins } from "./App";
// import WinProvider from "./customContext/WinsProvider";
// import { WinContext } from "./customContext/WinsProvider";
import { useContextWins } from "./customContext/WinsProvider";

export const Stats = () => {
  // const { wins } = useContext(WinContext);
  const { wins, bestRace } = useContextWins();

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
      <h2>The best quote you completed is "{bestRace.quote}".</h2>
      <h3>You finished the race with an amazing WPM of: {bestRace.bestWPM}</h3>
    </div>
  );
};
