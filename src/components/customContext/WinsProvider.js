import React, { useState, useEffect } from "react";

export const WinContext = React.createContext();

const WinProvider = ({ children, initialCount = 0 }) => {
  const [wins, setWins] = useState(initialCount);
  const [playerWin, setPlayerWin] = useState(false);

  // useEffect(() => {
  //   setWins(wins + 1);
  // }, [playerWin]);

  // useEffect(() => {
  //   // incrementWins();
  // }, [wins]);
  const incrementWins = () => {
    setWins(wins + 1);
  };

  return (
    <WinContext.Provider
      value={{ wins, playerWin, setPlayerWin, incrementWins }}
    >
      {children}
    </WinContext.Provider>
  );
};

export default WinProvider;
