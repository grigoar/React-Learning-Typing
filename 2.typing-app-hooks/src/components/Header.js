import React from "react";

export const Header = (props) => {
  return (
    <header className="header">
      <div className="header__text-box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">Touch Typing </span>
          <br></br>
          <span className="heading-primary--sub">
            is essential in a digital era
          </span>
        </h1>

        {/* <a href="#section-tours" className="btn btn--white btn--animated"></a> */}
      </div>
    </header>
  );
};
