import React, { useState, useEffect, useContext } from "react";

const WinContext = React.createContext();

export const useContextWins = () => {
  return useContext(WinContext);
};

const WinProvider = ({ children, initialCount = 0 }) => {
  let nrWinsSaved = localStorage.getItem("wins");
  // localStorage.clear();
  const [wins, setWins] = useState(nrWinsSaved ? nrWinsSaved : initialCount);

  const incrementWins = () => {
    setWins(wins + 1);
    localStorage.setItem("wins", (wins + 1).toString());
  };

  return (
    <WinContext.Provider value={{ wins, incrementWins }}>
      {children}
    </WinContext.Provider>
  );
};

export default WinProvider;
