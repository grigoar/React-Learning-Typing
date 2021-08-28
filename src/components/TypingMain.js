import React, { useState, useEffect, useRef } from "react";

export const TypingMain = () => {
  const [typedText, setTypedText] = useState("");
  const [dynamicText, setDynamicText] = useState([]);
  const [matchingText, setMatchingText] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const textLength = useRef(0);
  const matchText = "Believe you can and you're halfway there.";

  const splitMatchText = (matchText) => {
    const matchTextSplitted = [...matchText];
    // console.log(matchTextSplitted[1]);
    // console.log(matchText);
    // for (let character of matchTextSplitted) {
    //   console.log(character);
    // }
    return matchTextSplitted;
  };
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

  const handleIndex = (e) => {
    // e.key === "Enter"
    //   ? console.log("enter pressed")
    //   : console.log("something is not working");
    // console.log(`The key pressed : ${e.keyCode}`);
    // console.log(`The keyCode for the key pressed is: ${e.keyCode}`);
    // e.keyCode === 8
    //   ? setCurrentIndex(currentIndex - 1)
    //   : console.log("yea, not working");
    // if (e.keyCode === 16) return;
    // e.keyCode !== 8
    //   ? setCurrentIndex(currentIndex + 1)
    //   : setCurrentIndex(currentIndex - 1);
    // setCurrentIndex(currentIndex + 1);
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
        onKeyDown={(e) => handleIndex(e)}
      ></input>
    </main>
  );
};
