import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { loadProducts, selectProd } from "../../actions";

import Input from "../../components/Input/Input";
import Btn from "../../components/Button/Button";
import ArticleModal from "../../components/Modal/ArticleModal";
import ProductGrd from "./ProductGrd";

const ProductsView = () => {
  const [prodModalOpen, setprodModalOpen] = useState(false);

  // modal props
  const [type, setType] = useState("");
  const [gridType, setGridType] = useState("");

  const dispatch = useDispatch();

  const handleOnClickBtn = (typ, gtyp) => {
    // en caso de no seleccion y que se use un boton mandar un warning

    setType(typ);
    setGridType(gtyp);

    if (typ === "new") dispatch(selectProd({}));

    setprodModalOpen(true);
  };

  const handleOnSubmit = (type, producto) => {
    // aca va el llamado a la bd
    if (type === "new") dispatch(loadProducts([producto]));
  };

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

  // Render
  let content = (
    <>
      <Input />
      <ProductGrd />
      <div className="shadow bg-white rounded m-3 d-flex flex-row">
        <Btn
          type="new"
          gridType="PRODUCTS"
          title="Nuevo"
          classes="btn btn-dark m-2"
          onclick={handleOnClickBtn}
          styles={{ width: "100px" }}
        />
        <Btn
          gridType="PRODUCTS"
          type="update"
          title="Modificar"
          classes="btn btn-dark m-2"
          onclick={handleOnClickBtn}
          styles={{ width: "100px" }}
        />
        <Btn
          gridType="PRODUCTS"
          type="delete"
          title="Borrar"
          classes="btn btn-dark m-2"
          onclick={handleOnClickBtn}
          styles={{ width: "100px" }}
        />
      </div>
      <Modal
        isOpen={prodModalOpen}
        onRequestClose={() => setprodModalOpen(false)}
        shouldCloseOnOverlayClick={false}
        closeTimeoutMS={200}
        style={customStyles}
      >
        <ArticleModal
          btnType={type}
          gridType={gridType}
          handleOnSubmit={handleOnSubmit}
        />
      </Modal>
    </>
  );

  return content;
};

export default React.memo(ProductsView);
