import React, { useState, useEffect, useRef } from "react";
import TypingText from "./TypingText";

export const TextTypingContext = React.createContext();

export const TypingMain = () => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);
  const [matchText, setMatchText] = useState(
    "Believe you can and you're halfway there."
  );
  // const matchText = "Believe you can and you're halfway there.";

  useEffect(() => {
    // if (!query) return;
    const url = "https://type.fit/api/quotes";
    const fetchData = async () => {
      setStatus("fetching");
      const response = await fetch(`https://type.fit/api/quotes`);
      const data = await response.json();
      setData(data);
      setStatus("fetch");
      const randomIndexText = Math.floor(Math.random() * data.length);
      setMatchText(data[randomIndexText].text);
      console.log(data);
    };

    fetchData();
  }, []);
  // }, [query]);

  const pickRandomText = () => {
    console.log("something is happening");
    const randomIndexText = Math.floor(Math.random() * data.length);
    // console.log(data[randomIndexText]);
    setMatchText(data[randomIndexText].text);
  };

  return (
    <TextTypingContext.Provider value={matchText}>
      <main className="typing-main">
        <TypingText></TypingText>
        <button onClick={() => pickRandomText()}> New Quote</button>
      </main>
    </TextTypingContext.Provider>
  );
};
