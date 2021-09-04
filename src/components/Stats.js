import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { TypingWins } from "./App";
// import WinProvider from "./customContext/WinsProvider";
// import { WinContext } from "./customContext/WinsProvider";
import { useContextWins } from "../customContext/WinsProvider";
import Navbar from "./Navbar";

export const Stats = (props) => {
  // const { wins } = useContext(WinContext);
  const { wins, bestRace, resetStats } = useContextWins();

  return (
    <div>
      <Navbar />
      <h1>
        You have {wins} touch typing texts completed.{" "}
        {wins > 0
          ? "Congratulations"
          : "Go try and complete typing some quotes"}
        !
      </h1>
      <h2>The best quote you completed is "{bestRace.quote}".</h2>
      <h3>You finished that race with an amazing WPM of: {bestRace.bestWPM}</h3>
      <button onClick={resetStats}>Reset Stats</button>
    </div>
  );
};
