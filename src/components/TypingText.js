import React, { useState, useEffect, useRef, useContext } from "react";
import { TextTypingContext } from "./TypingMain";

const TypingText = (props) => {
  const [typedText, setTypedText] = useState("");
  const [dynamicText, setDynamicText] = useState([]);
  const [matchingText, setMatchingText] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [disabled, setDisabled] = useState("");
  const isWin = useRef(false);
  const nrWins = useRef(0);

  const textLength = useRef(0);
  const matchText = useContext(TextTypingContext);
  //   const matchText = "Believe you can and you're halfway there.";

  useEffect(() => {
    console.log(props);
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
    isWin.current = false;
  }, [matchText]);

  const displayTypedText = (e) => {
    setTypedText(e.target.value);
    // console.log(e.target.value);
    // console.log(data);

    //Using ref for maintaining the previous length
    // console.log(textLength.current);
    // e.target.value.length > textLength.current
    //   ? setCurrentIndex(currentIndex + 1)
    //   : setCurrentIndex(currentIndex - 1);

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
      typedText.length - 1 === dynamicText.length - 1
    )
      isFinished = true;

    if (isFinished) {
      if (isFinishedSuccessfully) {
        console.log("is a win");
        isWin.current = true;
        nrWins.current += 1;
        setTypedText("");
        return <div>Congratulations!!!!</div>;
      } else return <div>Please try again! Try to improve your accuracy!</div>;
    } else return null;
  };

  const setWinner = () => {
    // setDisabled("disabled")
  };

  return (
    <div>
      <div className="typing-main__text">{matchingText}</div>
      <div>{checkFinishedText()}</div>
      <div>
        {isWin.current ? "is a win" : ""} - You have now {nrWins.current}{" "}
        victories.
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
