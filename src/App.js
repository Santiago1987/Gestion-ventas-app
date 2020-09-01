import React, { useState } from "react";
import Modal from "react-modal";

import Nav from "./components/Nav/Nav";
import ProductView from "./containers/ProducsView/ProductsList";
import Sales from "./containers/SalesView/Sales";

import "./styles.css";

Modal.setAppElement("#root");

function App() {
  return (
    <div>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm">
            <ProductView />
          </div>
          <div className="col-sm">
            <Sales />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
