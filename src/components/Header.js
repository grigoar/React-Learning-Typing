import React from "react";

export const Header = (props) => {
  return (
    <header className="header">
      <div className="header__logo-box">
        <img
          src="img/touch-typing-logo.svg"
          alt="Logo"
          className="header__logo"
        />
      </div>
      <div className="header__text-box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">Touch Typing</span>
          <span className="heading-primary--sub">
            is essential in the digital era
          </span>
        </h1>

        {/* <a href="#section-tours" className="btn btn--white btn--animated"></a> */}
      </div>
    </header>
  );
};
