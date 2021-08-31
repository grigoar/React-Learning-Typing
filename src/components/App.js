import React from "react";
import { Switch, Route } from "react-router-dom";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { TypingMain } from "./TypingMain";
import { Stats } from "./Stats";
import About from "./About";

const App = () => {
  return (
    <div>
      <Header></Header>
      <Switch>
        <Route path="/" component={TypingMain} exact></Route>
        <Route path="/stats" component={Stats}></Route>
        <Route path="/about" component={About}></Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
};

export default App;
