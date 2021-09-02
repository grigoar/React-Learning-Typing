import React, { useState, useEffect, useContext } from "react";

const WinContext = React.createContext();

export const useContextWins = () => {
  return useContext(WinContext);
};

const WinProvider = ({ children, initialCount = 0 }) => {
  const [wins, setWins] = useState(initialCount);

  const incrementWins = () => {
    setWins(wins + 1);
  };

  return (
    <WinContext.Provider value={{ wins, incrementWins }}>
      {children}
    </WinContext.Provider>
  );
};

export default WinProvider;
