import React, { useRef, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { TypingMain } from "./TypingMain";
import { Stats } from "./Stats";
import About from "./About";
import { useFetchQuotes } from "../customHooks/useFetchQuotes";
import WinProvider from "../customContext/WinsProvider";
import Navbar from "./Navbar";

// export const TypingWins = React.createContext();

const App = () => {
  const { status, data, matchText, pickRandomText } = useFetchQuotes();

  return (
    <div className="container">
      <Navbar />

      <WinProvider initialCount={0}>
        <Switch>
          <Route path="/" exact>
            <TypingMain
              status={status}
              matchText={matchText}
              pickRandomText={pickRandomText}
            ></TypingMain>
          </Route>
          <Route path="/stats">
            <Stats></Stats>
          </Route>
          <Route path="/about" component={About}></Route>
        </Switch>
      </WinProvider>
      <Footer></Footer>
    </div>
  );
};

export default App;
