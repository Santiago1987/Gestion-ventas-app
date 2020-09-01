import React, { useState } from "react";
import Modal from "react-modal";

import Nav from "./components/Nav/Nav";
import ProductView from "./containers/ProducsView/ProductsList";
import Sales from "./containers/SalesView/Sales";
import Input from "./components/Input/Input";
import ArticleModal from "../src/components/Modal/ArticleModal";
import Btn from "./components/Button/Button";
import "./styles.css";

Modal.setAppElement("#root");

function App() {
  const [prodModalOpen, setprodModalOpen] = useState(false);
  return (
    <div>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm">
            <Input />
          </div>

          <div className="col-sm"></div>
        </div>

        <div className="row">
          <div className="col-sm">
            <ProductView />
          </div>

          <div className="col-sm">
            <Sales />
          </div>
        </div>

        <div className="row">
          <div className="col-sm shadow bg-white rounded m-3 d-flex flex-row">
            <Btn
              title="Nuevo"
              classes="btn btn-dark m-2"
              func={setprodModalOpen}
              styles={{ width: "100px" }}
            />
            <Btn
              title="Modificar"
              classes="btn btn-dark m-2"
              styles={{ width: "100px" }}
            />
            <Btn
              title="Borrar"
              classes="btn btn-dark m-2"
              styles={{ width: "100px" }}
            />
          </div>
          <div
            className="col-sm shadow bg-white rounded m-3"
            styles={{ height: "60px" }}
          ></div>
        </div>
      </div>
      <Modal
        isOpen={prodModalOpen}
        onRequestClose={() => setprodModalOpen(false)}
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
