import React, { useEffect } from "react";
import Modal from "react-modal";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHttp } from "./containers/hooks/http";
import { setSettings } from "./actions";

import Nav from "./components/Nav/Nav";
import Main from "./components/MainComponents/Main";
import Estadisticas from "./components/MainComponents/Estadisticas";

import "./styles.css";
import Settings from "./components/MainComponents/Settings";
import Cierre from "./components/MainComponents/Cierre";

Modal.setAppElement("#root");

function App() {
  const dispatch = useDispatch();
  const { REACT_APP_BACKEND_URL, REACT_APP_SETTINGS } = process.env;

  const [isLoadding, response] = useHttp(
    `${REACT_APP_BACKEND_URL}${REACT_APP_SETTINGS}`,
    [],
    "GET"
  );

  useEffect(() => {
    if (response !== null) {
      let { data } = response;
      dispatch(setSettings(data));
    }
  }, [isLoadding]);

  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/main" exact component={Main} />
        <Route path="/estadisticas" exact component={Estadisticas} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/cierre" exact component={Cierre} />
      </Switch>
    </Router>
  );
}

export default App;
