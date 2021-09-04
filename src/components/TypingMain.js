import React, { useState } from "react";
import { Link } from "react-router-dom";

import TypingText from "./TypingText";
import Navbar from "./Navbar";
import TipsTouchTyping from "./TipsTouchTyping";

export const TextTypingContext = React.createContext();

export const TypingMain = (props) => {
  const [showTips, setShowTips] = useState(false);
  const { status, matchText, pickRandomText } = props;

  const displayTips = () => {
    if (showTips)
      return (
        <>
          <TipsTouchTyping></TipsTouchTyping>
        </>
      );
    return null;
  };

  return (
    <TextTypingContext.Provider value={{ status, matchText }}>
      <main className="typing-main">
        <Navbar></Navbar>
        <TypingText></TypingText>
        <button onClick={() => pickRandomText()}> New Quote</button>
        <div>
          <button onClick={() => setShowTips(!showTips)}>
            {!showTips ? "Show tips" : "Hide Tips"}
          </button>
        </div>
        <div>{displayTips()}</div>
      </main>
    </TextTypingContext.Provider>
  );
};
