import React, { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);
  const [matchText, setMatchText] = useState("Loading...");
  // const matchText = "Believe you can and you're halfway there.";

  useEffect(() => {
    // if (!query) return;
    const url = "https://type.fit/api/quotes";
    const fetchData = async () => {
      setStatus("fetching");
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setStatus("fetch");
      const randomIndexText = Math.floor(Math.random() * data.length);
      setMatchText(data[randomIndexText].text);
      console.log(data);
    };

    if (data.length === 0) fetchData();
    console.log("A call for getting the quotes was made");
  }, []);
  // }, [query]);

  const pickRandomText = () => {
    console.log("something is happening");
    const randomIndexText = Math.floor(Math.random() * data.length);
    // console.log(data[randomIndexText]);
    setMatchText(data[randomIndexText].text);
  };

  return { status, data, matchText, pickRandomText };
};
