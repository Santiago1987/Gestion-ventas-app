import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { searchInput, selectProd } from "../../actions";
import axios from "axios";

import Input from "../../components/Input/Input";
import ArticleModal from "../../components/Modal/ArticleModal";
import ProductGrd from "./ProductGrd";
import BtnProdList from "./BtnProdList";

const ProductsView = () => {
  const [prodModalOpen, setprodModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [response, setResponse] = useState(null);

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

  const handleOnSubmit = async (type, producto) => {
    console.log(producto);

    if (type === "new") {
      await axios
        .post("/data/save/newArticle", object)
        .then((data) => {
          setResponse(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "update") {
      let { id } = producto;
      await axios
        .post(`/data/update/article/${id}`, producto)
        .then((data) => {
          setResponse(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "delete") {
      let { id } = producto;
      axios
        .delete(`/data/delete/article/${id}`)
        .then((data) => {
          setResponse(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setprodModalOpen(false);
    return;
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
