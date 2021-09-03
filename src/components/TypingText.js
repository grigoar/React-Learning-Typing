import React, { useState, useEffect, useRef, useContext } from "react";
import { TextTypingContext } from "./TypingMain";
// import { TypingWins } from "./App";
// import WinProvider from "./customContext/WinsProvider";
// import { WinContext } from "./customContext/WinsProvider";
import { useContextWins } from "./customContext/WinsProvider";

const TypingText = (props) => {
  const [typedText, setTypedText] = useState("");
  const [dynamicText, setDynamicText] = useState([]);
  const [matchingText, setMatchingText] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeStart, setTimeStart] = useState(0);
  const [timeDelta, setTimeDelta] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [quoteWPM, setQuoteWPM] = useState(0);
  const isWin = useRef(false);
  // const nrWins = useRef(0);

  const textLength = useRef(0);
  const { matchText } = useContext(TextTypingContext);
  // const { wins, incrementWins } = useContext(WinContext);
  const { wins, incrementWins } = useContextWins();
  //   const matchText = "Believe you can and you're halfway there.";

  //use effect to increase the number of quotes typed with 100% accuracy
  useEffect(() => {
    if (isWin.current) {
      let timeDeltaNow = window.performance.now() - timeStart;
      setTimeDelta(timeDeltaNow);

      let wpmNow = (12 * dynamicText.length) / (timeDeltaNow / 1000);
      setQuoteWPM(Math.round(wpmNow));
      incrementWins();
    }
  }, [isWin.current]);

  //use effect to show the WPM in real time
  useEffect(() => {
    if (typedText.length > 3) {
      let timeDeltaNow = window.performance.now() - timeStart;
      setTimeDelta(timeDeltaNow);
      //60s * nrCharacters / (timePassed * 5)
      let wpmNow = (12 * typedText.length) / (timeDeltaNow / 1000);

      setWpm(Math.round(wpmNow));
    }
  }, [typedText]);

  useEffect(() => {
    if (typedText.length === 1) {
      setTimeStart(window.performance.now());
    }
  }, [typedText]);

  //for processing the quote received
  useEffect(() => {
    // console.log(props);
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

  //for initializing the new quote
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
    setCurrentIndex(0);
    setTypedText("");
    setTimeStart(0);
    setWpm(0);
    isWin.current = false;
  }, [matchText]);

  const displayTypedText = (e) => {
    setTypedText(e.target.value);
    setCurrentIndex(e.target.value.length);
    // console.log(textLength);
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

  const checkFinishedText = () => {
    let isFinished = false;
    let isFinishedSuccessfully = true;
    for (const [i, letter] of dynamicText.entries()) {
      if (letter.check !== "valid") {
        isFinishedSuccessfully = false;
        break;
      }
    }

    if (
      typedText.length !== 0 &&
      typedText.length - 1 >= dynamicText.length - 1
    )
      isFinished = true;

    if (isFinished) {
      if (isFinishedSuccessfully) {
        console.log("is a win");
        isWin.current = true;
        // nrWins.current += 1;

        setTypedText("");
        return <div>Congratulations!!!!</div>;
      } else return <div>Please try again! Try to improve your accuracy!</div>;
    } else return null;
  };

  return (
    <div>
      <div className="typing-main__text">{matchingText}</div>
      <div>WPM now: {wpm}</div>
      <div>{checkFinishedText()}</div>
      <div>
        {isWin.current
          ? `Time spent typing this quote: ${Math.round(timeDelta / 1000)}s`
          : ""}{" "}
      </div>
      {/* <div>WPM: {quoteWPM}</div> */}
      <div>
        {isWin.current ? "Text completed with 100% accuracy." : ""} - Quotes
        completed: {wins}. *You need to complete the quote typed with 100%
        accuracy to improve your score.
      </div>
      <div>
        {typedText.length === 0 && !isWin.current ? "Start typing..." : ""}
      </div>
      <input
        className="typing-main__input"
        style={{ width: "100%" }}
        type="text"
        id="typeText"
        value={isWin.current ? "" : typedText}
        onChange={(e) => displayTypedText(e)}
        disabled={isWin.current ? "disabled" : ""}
      ></input>
    </div>
  );
};

export default TypingText;
