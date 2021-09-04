import React from "react";
import { useContextWins } from "../customContext/WinsProvider";

export const Stats = (props) => {
  const { wins, bestRace, resetStats } = useContextWins();

  return (
    <div>
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
