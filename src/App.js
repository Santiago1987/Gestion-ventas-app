import React, { useState } from "react";
import Modal from "react-modal";

import Nav from "./components/Nav/Nav";
import ProductView from "./containers/ProducsView/ProductsList";
import Sales from "./containers/SalesView/Sales";
import Input from "./components/Input/Input";
import ArticleModal from "../src/components/Modal/ArticleModal";
import "./styles.css";

Modal.setAppElement("#root");

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      Navigation bar
      <Nav />
      <div className="container-fluid">
        ------------------------------------------------------------------------
        Primera fila
        <div className="row">
          Primera columna
          <div className="col-sm">
            <Input />
          </div>
          Segunda columna
          <div className="col-sm"></div>
        </div>
        ------------------------------------------------------------------------
        Segunda fila
        <div className="row">
          Primera columna
          <div className="col-sm">
            <ProductView />
          </div>
          Segunda columna
          <div className="col-sm">
            <Sales />
          </div>
        </div>
        ------------------------------------------------------------------------
        Tercera Fila
        <div className="row">
          Primera columna
          <div
            className="col-sm shadow bg-white rounded m-3"
            style={{ height: "60px", alignItems: "center" }}
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setModalIsOpen(true)}
            >
              Nuevo articulo
            </button>
          </div>
          <div
            className="col-sm shadow bg-white rounded m-3"
            style={{ height: "60px" }}
          ></div>
        </div>
        ------------------------------------------------------------------------
        Modal
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={false}
        closeTimeoutMS={200}
        style={customStyles}
      >
        <ArticleModal />
      </Modal>
    </div>
  );
}

export default App;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
