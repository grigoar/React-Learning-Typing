import React, { useState } from "react";

import TypingText from "./TypingText";
import TipsTouchTyping from "./TipsTouchTyping";
import { Header } from "./Header";

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
    return <></>;
  };

  return (
    <TextTypingContext.Provider value={{ status, matchText }}>
      <Header></Header>
      <main className="typing-main">
        <div>
          <button
            className="btn typing-main__new-quote"
            onClick={() => pickRandomText()}
          >
            {" "}
            New Quote
          </button>
        </div>
        <TypingText></TypingText>
      </main>
    </TextTypingContext.Provider>
  );
};
