import React from "react";
import TipsTouchTyping from "./TipsTouchTyping";

const About = () => {
  return (
    <div className="about">
      <h1>Learn more about touch typing</h1>
      <TipsTouchTyping></TipsTouchTyping>
      <div className="about__text">
        <p>
          Touch typing (also called touch type, blind typing, or touch
          keyboarding) is a style of typing. Although the phrase refers to
          typing without using the sense of sight to find the keys—specifically,
          a touch typist will know their location on the keyboard through muscle
          memory—the term is often used to refer to a specific form of touch
          typing that involves placing the eight fingers in a horizontal row
          along the middle of the keyboard (the home row) and having them reach
          for specific other keys. (Under this usage, typists who do not look at
          the keyboard but do not use home row either are referred to as hybrid
          typists.) Both two-handed touch typing and one-handed touch typing are
          possible.
        </p>
        <p>
          Frank Edward McGurrin, a court stenographer from Salt Lake City, Utah
          who taught typing classes, reportedly invented home row touch typing
          in 1888. On a standard QWERTY keyboard for English speakers the home
          row keys are: "ASDF" for the left hand and "JKL;" for the right hand.
          Most modern computer keyboards have a raised dot or bar on the home
          keys for the index fingers to help touch typists maintain and
          rediscover the correct positioning the fingers on the keyboard keys.
        </p>
        <p>
          For more see on &nbsp;
          <a href="https://en.wikipedia.org/wiki/Touch_typing">Wiki page</a>.
        </p>
      </div>
    </div>
  );
};

export default About;
