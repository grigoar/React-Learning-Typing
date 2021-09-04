import React from "react";
import { useContextWins } from "../customContext/WinsProvider";

export const Stats = (props) => {
  const { wins, bestRace, resetStats } = useContextWins();

  return (
    <div className="stats">
      <div className="stats--wins">
        You completed <span className="green">{wins} </span>
        quotes.
        {wins > 0 ? (
          <span className="green"> Congratulations!</span>
        ) : (
          <span className="red"> Go try and complete typing some quotes!</span>
        )}
      </div>
      <div className="stats--best-quote">
        The fasted typed quote is: <span>"{bestRace.quote}".</span>
      </div>
      <div className="stats--best-wpm">
        You finished that quote with an amazing <span>{bestRace.bestWPM}</span>{" "}
        WPM.
      </div>
      <button className="btn btn--danger stats--reset" onClick={resetStats}>
        Reset Stats
      </button>
    </div>
  );
};
