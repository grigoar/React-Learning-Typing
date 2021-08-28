import React, { useState, useEffect, useRef } from "react";

export const TypingMain = () => {
  const [typedText, setTypedText] = useState("");
  const [dynamicText, setDynamicText] = useState([]);
  const [matchingText, setMatchingText] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const textLength = useRef(0);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);
  const matchText = "Believe you can and you're halfway there.";

  useEffect(() => {
    // if (!query) return;
    const url = "https://type.fit/api/quotes";
    const fetchData = async () => {
      setStatus("fetching");
      const response = await fetch(`https://type.fit/api/quotes`);
      const data = await response.json();
      setData(data);
      setStatus("fetch");
      console.log(data);
    };

    fetchData();
  }, []);
  // }, [query]);

  useEffect(() => {
    const matchTextSplitted = [...matchText];
    let dynamicTextFirstRender = [];
    for (let [index, character] of matchTextSplitted.entries()) {
      dynamicTextFirstRender.push({
        id: index,
        character: character,
        check: "normal",
      });
    }
    setDynamicText(dynamicTextFirstRender);
    setMatchingText(matchText);
    // console.log(dynamicTextFirstRender);
  }, []);

  const displayTypedText = (e) => {
    // console.log("this is not working");
    // console.log(dynamicText);
    setTypedText(e.target.value);
    console.log(data);

    //Using ref for maintaining the previous length
    // console.log(textLength.current);
    // e.target.value.length > textLength.current
    //   ? setCurrentIndex(currentIndex + 1)
    //   : setCurrentIndex(currentIndex - 1);

    setCurrentIndex(e.target.value.length);
    console.log(textLength);
    // console.log(`Something and the current index id: ${currentIndex}`);
    // console.log(matchText);
    setMatchingText(
      dynamicText.map((letter, index) => {
        if (e.target.value.length <= index) {
          letter.check = "normal";
        } else if (
          e.target.value.slice(-1) === letter.character &&
          index === currentIndex
        ) {
          letter.check = "valid";
        } else if (
          letter.check === "normal" &&
          e.target.value.slice(-1) !== letter.character &&
          index === currentIndex
        ) {
          letter.check = "invalid";
        }

        textLength.current = e.target.value.length;
        return (
          <span
            key={index}
            style={{
              backgroundColor:
                letter.check === "normal"
                  ? "transparent"
                  : letter.check === "valid"
                  ? "#99cc00"
                  : "#f0a3a3",
            }}
          >
            {letter.character}
          </span>
        );
      })
    );
  };

  return (
    <main className="typing-main">
      <div className="typing-main__text">{matchingText}</div>
      <input
        className="typing-main__input"
        style={{ width: "100%" }}
        type="text"
        id="typeText"
        value={typedText}
        onChange={(e) => displayTypedText(e)}
      ></input>
    </main>
  );
};
