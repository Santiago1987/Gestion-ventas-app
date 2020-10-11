import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { loadProducts, searchInput, selectProd } from "../../actions";

import Input from "../../components/Input/Input";
import ArticleModal from "../../components/Modal/ArticleModal";
import ProductGrd from "./ProductGrd";
import BtnProdList from "./BtnProdList";

const ProductsView = () => {
  const [prodModalOpen, setprodModalOpen] = useState(false);
  const dispatch = useDispatch();

  //------------------------------Search input-------------------------------------------
  const search = useSelector((state) => state.Search);

  const handleOnchangeSearch = (val) => {
    dispatch(searchInput(val));
  };
  //-------------------------------------------------------------------------

  //-----------------------------Modal--------------------------------------------
  const [type, setType] = useState("");
  const [gridType, setGridType] = useState("");

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

  const handleOnCancel = () => {
    setprodModalOpen(false);
  };
  //-------------------------------------------------------------------------

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

  //-----------------------------Render--------------------------------------------
  let content = (
    <>
      <Input
        value={search}
        placeholder="Descripcion del articulo"
        title="Search"
        handleOnchangeSearch={handleOnchangeSearch}
      />
      <ProductGrd />
      <BtnProdList handleOnClickBtn={handleOnClickBtn} />
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
          handleOnCancel={handleOnCancel}
        />
      </Modal>
    </>
  );

  return content;
};

export default React.memo(ProductsView);
