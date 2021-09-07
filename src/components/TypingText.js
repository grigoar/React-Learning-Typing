import React, { useState, useEffect, useRef, useContext } from "react";
import { TextTypingContext } from "./TypingMain";
import { useContextWins } from "../customContext/WinsProvider";

const TypingText = (props) => {
  //I should've stored the data in a more structured way using state with objects, but it is too late now :D  :))
  const [typedText, setTypedText] = useState("");
  const [dynamicText, setDynamicText] = useState([]);
  const [matchingText, setMatchingText] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeStart, setTimeStart] = useState(0);
  const [timeDelta, setTimeDelta] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [quoteWPM, setQuoteWPM] = useState(0);
  const [started, setStarted] = useState(false);
  const [realAccuracy, setRealAccuracy] = useState({
    accuracy: 0,
    errorsMade: 0,
  });
  const isWin = useRef(false);

  const textLength = useRef(0);
  const { matchText } = useContext(TextTypingContext);
  const { wins, incrementWins, bestRace, recordBestRace } = useContextWins();
  //   const matchText = "Believe you can and you're halfway there.";

  //use effect to increase the number of quotes typed with 100% accuracy
  useEffect(() => {
    if (isWin.current) {
      setStarted(false);
      let timeDeltaNow = window.performance.now() - timeStart;
      setTimeDelta(timeDeltaNow);

      let wpmNow = Math.round(
        (12 * dynamicText.length) / (timeDeltaNow / 1000)
      );
      setQuoteWPM(wpmNow);
      incrementWins();

      //saving the best race of the player
      if (wpmNow > bestRace.bestWPM) {
        recordBestRace({ ...bestRace, bestWPM: wpmNow, quote: matchText });
      }

      //calculating the real accuracy
      let accuracyC =
        (matchText.length / (matchText.length + realAccuracy.errorsMade)) * 100;
      if (accuracyC < 0) accuracyC = 0;
      setRealAccuracy({
        ...realAccuracy,
        accuracy: (Math.round(accuracyC * 100) / 100).toFixed(2),
      });
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
    if (typedText.length === 1 && !started) {
      setStarted(true);
      setTimeStart(window.performance.now());
    }
  }, [typedText]);

  //for processing the quote received
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
    setRealAccuracy({ accuracy: 0, errorsMade: 0 });
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
          setRealAccuracy({
            ...realAccuracy,
            errorsMade: realAccuracy.errorsMade + 1,
          });
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

        // setTypedText("");
        return <div className="green focus-good">Congratulations!!!!</div>;
      } else
        return (
          <div className="red focus-bad">
            Please try harder! You need 100% accuracy to finish the quote!
          </div>
        );
    } else return null;
  };

  return (
    <div>
      <div className="typing-main__text">{matchingText}</div>
      <div className="typing-main__finish_typing">{checkFinishedText()}</div>
      <div className="typing-main__wpm">WPM: {wpm}.</div>
      <div className="typing-main__time-spent">
        {isWin.current ? `Time: ${Math.round(timeDelta / 1000)}s.` : ""}{" "}
      </div>
      {/* <div>WPM: {quoteWPM}</div> */}

      <div className="typing-main__start_typing">
        {typedText.length === 0 && !isWin.current ? "Start typing..." : ""}
        <span className="typing-main__finish-accuracy">
          {isWin.current
            ? `Quote completed with the real accuracy of: ${realAccuracy.accuracy}%.`
            : ""}
        </span>
      </div>
      <label>
        <input
          className="typing-main__input"
          style={{ width: "100%" }}
          type="text"
          id="typeText"
          value={isWin.current ? "" : typedText}
          onChange={(e) => displayTypedText(e)}
          disabled={isWin.current ? "disabled" : ""}
        ></input>
      </label>

      <div className="typing-main__tip">
        *You need to complete the quote with 100% accuracy to improve your
        score.
      </div>
      <div className="typing-main__score">
        Quotes completed: <span>{wins}</span>.
      </div>
    </div>
  );
};

export default TypingText;
