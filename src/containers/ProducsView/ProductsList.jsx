import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import {
  searchInput,
  selectProd,
  loadProducts,
  updateProduct,
  deleteProduct,
} from "../../actions";
import axios from "axios";

import Input from "../../components/Input/Input";
import ArticleModal from "../../components/Modal/ArticleModal";
import ProductGrd from "./ProductGrd";
import BtnProdList from "./BtnProdList";

const ProductsView = () => {
  const [prodModalOpen, setprodModalOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedProd = useSelector((state) => state.selectedProd);

  //------------------------------Search input-------------------------------------------
  const search = useSelector((state) => state.Search);

  const handleOnchangeSearch = (val) => {
    dispatch(searchInput(val));
  };
  //-------------------------------------------------------------------------
  const dolar = 70;
  const porcLocal = 10;
  const porcML = 25;
  //-----------------------------Modal--------------------------------------------
  const [type, setType] = useState("");

  const handleOnClickBtn = (typ, gtyp) => {
    setType(typ);
    if (
      (typ === "update" || typ === "delete") &&
      selectedProd.table !== "PRODUCTS"
    )
      return;

    if (typ === "new") dispatch(selectProd({}));

    setprodModalOpen(true);
  };

  const handleOnSubmit = async (type, producto) => {
    let response = null;
    if (type === "new") {
      await axios
        .post("http://localhost:3000/api/save/newArticle", producto)
        .then((res) => {
          response = res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      if (response._id !== 0) {
        let { _id, descripcion, stock, prDolar, ingreso } = response;
        let prPesos =
          Math.round((prDolar * dolar + Number.EPSILON) * 100) / 100;
        let prLocal =
          Math.round(
            ((prDolar * dolar) / ((100 - 10) / porcLocal) + Number.EPSILON) *
              100
          ) / 100;
        let prML =
          Math.round(
            (prDolar * dolar * (porcML / 100 + 1) + Number.EPSILON) * 100
          ) / 100;
        dispatch(
          loadProducts([
            {
              id: _id,
              descripcion,
              stock,
              prDolar,
              ingreso,
              prPesos,
              prLocal,
              prML,
            },
          ])
        );
      }

      dispatch(loadProducts([]));
    } else if (type === "update") {
      let { id } = producto;

      await axios
        .post(`http://localhost:3000/api/update/article/${id}`, producto)
        .then((res) => {
          response = res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      if (response.id !== 0) {
        dispatch(updateProduct(response));
      }
    } else if (type === "delete") {
      let { id } = producto;
      await axios
        .delete(`http://localhost:3000/api/delete/article/${id}`)
        .then((res) => {
          response = res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      if (response.id !== 0) {
        dispatch(deleteProduct(response.id));
      }
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
      <BtnProdList
        handleOnClickBtn={handleOnClickBtn}
        disable={selectedProd.table !== "PRODUCTS"}
      />
      <Modal
        isOpen={prodModalOpen}
        onRequestClose={() => setprodModalOpen(false)}
        shouldCloseOnOverlayClick={false}
        closeTimeoutMS={200}
        style={customStyles}
      >
        <ArticleModal
          btnType={type}
          handleOnSubmit={handleOnSubmit}
          handleOnCancel={handleOnCancel}
        />
      </Modal>
    </>
  );

  return content;
};

export default React.memo(ProductsView);
