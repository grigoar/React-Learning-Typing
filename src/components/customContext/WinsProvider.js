import React, { useState, useEffect, useContext } from "react";

const WinContext = React.createContext();

export const useContextWins = () => {
  return useContext(WinContext);
};

const WinProvider = ({ children, initialCount = "0" }) => {
  let nrWinsSaved = localStorage.getItem("wins");
  // localStorage.clear();
  const [wins, setWins] = useState(nrWinsSaved ? nrWinsSaved : initialCount);
  const [bestRace, setBestRace] = useState({ bestWPM: 0, quote: "" });

  const incrementWins = () => {
    setWins((parseInt(wins) + 1).toString());
    localStorage.setItem("wins", (parseInt(wins) + 1).toString());
  };

  const recordBestRace = (race) => {
    console.log("is this working");
    console.log(race);
    setBestRace(race);
    localStorage.setItem("bestRaceWPM", race.bestWPM.toString());
    localStorage.setItem("besetRaceQuote", race.quote);
  };

  return (
    <WinContext.Provider
      value={{ wins, incrementWins, bestRace, recordBestRace }}
    >
      {children}
    </WinContext.Provider>
  );
};

export default WinProvider;
