import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import TypingText from "./TypingText";
import Navbar from "./Navbar";
import { useFetch } from "./customHooks/useFetchQuotes";

export const TextTypingContext = React.createContext();

export const TypingMain = (props) => {
  const { status, matchText, pickRandomText } = props;
  return (
    <TextTypingContext.Provider value={{ status, matchText }}>
      <main className="typing-main">
        <Navbar></Navbar>
        <TypingText></TypingText>
        <button onClick={() => pickRandomText()}> New Quote</button>
      </main>
    </TextTypingContext.Provider>
  );
};
