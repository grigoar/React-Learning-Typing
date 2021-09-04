import React, { useState, useEffect, useContext } from "react";

const WinContext = React.createContext();

export const useContextWins = () => {
  return useContext(WinContext);
};

const WinProvider = ({ children, initialCount = "0" }) => {
  let nrWinsSaved = localStorage.getItem("wins");
  let bestWPM = localStorage.getItem("bestRaceWPM");
  let bestRaceQuote = localStorage.getItem("besetRaceQuote");
  // localStorage.clear();
  const [wins, setWins] = useState(nrWinsSaved ? nrWinsSaved : initialCount);
  const [bestRace, setBestRace] = useState({
    bestWPM: bestWPM ? bestWPM : "0",
    quote: bestRaceQuote ? bestRaceQuote : "",
  });

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

  const resetStats = () => {
    localStorage.clear();
    setWins(0);
    setBestRace({ bestWPM: "0", bestRaceQuote: "" });
  };

  return (
    <WinContext.Provider
      value={{ wins, incrementWins, bestRace, recordBestRace, resetStats }}
    >
      {children}
    </WinContext.Provider>
  );
};

export default WinProvider;
