import React, { useState } from "react";
import Modal from "react-modal";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav/Nav";
import Main from "./components/MainComponents/Main";
import Estadisticas from "./components/MainComponents/Estadisticas";

import "./styles.css";

Modal.setAppElement("#root");

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/main" exact component={Main} />
        <Route path="/estadisticas" exact component={Estadisticas} />
      </Switch>
    </Router>
  );
}

export default App;
