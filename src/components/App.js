import React, { useRef, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { TypingMain } from "./TypingMain";
import { Stats } from "./Stats";
import About from "./About";
import { useFetch } from "./customHooks/useFetch";

export const TypingWins = React.createContext();

const App = () => {
  const { status, data, matchText, pickRandomText } = useFetch();
  const [wins, setWins] = useState(0);
  // const nrWins = useRef(0);
  // const setWins = () => {
  //   nrWins.current += 1;
  //   updateWins(nrWins.current);
  // };
  // const wins = nrWins.current;
  return (
    <div>
      <Header></Header>
      <TypingWins.Provider value={{ wins, setWins }}>
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
      </TypingWins.Provider>
      <Footer></Footer>
    </div>
  );
};

export default App;
