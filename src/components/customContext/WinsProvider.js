import React, { useState } from "react";

export const WinContext = React.createContext();

const WinProvider = ({ children, initialCount = 0 }) => {
  const [wins, setWins] = useState(initialCount);

  //   useEffect(()=>{
  //     setWins(wins+1);
  //   },[incrementWins])
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
