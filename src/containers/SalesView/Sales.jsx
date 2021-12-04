import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeAllSalesProducts,
  removeSalesProduct,
  updateProduct,
} from "../../actions";
import Modal from "react-modal";
import axios from "axios";

import SalesTop from "./SalesTop";
import SalesGrd from "./SalesGrd";
import SalesFoot from "./SalesFoot";
import SalesModal from "../../components/Modal/SalesModal";

const Sales = () => {
  const [salModalOpen, setSalModalOpen] = useState(false);
  const selectedProd = useSelector((state) => state.selectedProd);
  const salesProducts = useSelector((state) => state.salesProducts);
  const Products = useSelector((state) => state.Products);
  const { REACT_APP_BACKEND_URL, REACT_APP_SAVE_VENTA_URL } = process.env;
  const settings = useSelector((state) => state.settings);
  const { dolar } = settings;

  const dispatch = useDispatch();

  const [type, setType] = useState("");

  //---------------------------------------------------------------------------------------------------------------

  const handleOnClickBtn = (type, grid) => {
    if (grid !== "SALES" || salesProducts.length < 1) return;
    if (type === "remove" && selectedProd.table !== "SALES") return;

    setType(type);

    if (type === "cancel" || type === "finish") setSalModalOpen(true);
    else if (type === "remove") dispatch(removeSalesProduct(selectedProd));
  };

  const handleOnSubmit = async (type, gridType) => {
    let response = null;
    setSalModalOpen(false);
    if (gridType !== "SALES") return;

    if (type === "cancel") dispatch(removeAllSalesProducts());

    if (type === "finish") {
      let date = new Date();
      let artLines = [];

      salesProducts.map((p) => {
        let { id, descripcion, precio, cant } = p;
        let prod = Products.find((pr) => pr.id === id);

        artLines.push({
          id,
          descripcion,
          precioPesos: precio,
          precioDolar: prod.prDolar,
          precioNerd: parseFloat(prod.prDolar * dolar).toFixed(2),
          cant,
          total: precio * cant,
        });
      });

      let total = salesProducts.reduce((acum, s) => {
        return s.precio * s.cant + acum;
      }, 0);

      let totUS = artLines.reduce((acum, s) => {
        return s.precioDolar * s.cant + acum;
      }, 0);

      let totNerd = artLines.reduce((acum, s) => {
        let { precioNerd, cant } = s;
        return precioNerd * cant + acum;
      }, 0);

      let ticket = {
        refNum: getRefNum(date, "001"),
        fecha: getFechaReverce(date),
        totalPesos: total,
        totalDolares: totUS,
        totalNerd: totNerd,
        descuento: 0,
        lines: artLines,
      };

      await axios
        .post(`${REACT_APP_BACKEND_URL}${REACT_APP_SAVE_VENTA_URL}`, ticket)
        .then((res) => {
          response = res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      response.map((res) => {
        let { _id, descripcion, ingreso, prDolar, stock } = res;

        if (_id === 0) return; //errror

        dispatch(
          updateProduct({ id: _id, descripcion, ingreso, prDolar, stock })
        );
      });

      dispatch(removeAllSalesProducts());
    }
  };

  const handleOnCancel = () => {
    setSalModalOpen(false);
  };

  //---------------------------------------------------------------------------------------------------------------
  // funciones de fecha
  const getRefNum = (date, shop) => {
    return `${shop}${date.getFullYear()}${addZero(
      date.getMonth() + 1
    )}${addZero(date.getDate())}${addZero(date.getHours())}${addZero(
      date.getMinutes()
    )}`;
  };

  const getFecha = (date) => {
    return `${addZero(date.getDate())}-${addZero(
      date.getMonth() + 1
    )}-${date.getFullYear()} ${addZero(date.getHours())}:${addZero(
      date.getMinutes()
    )}:${addZero(date.getSeconds())}`;
  };

  const getFechaReverce = (date) => {
    return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(
      date.getDate()
    )} ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(
      date.getSeconds()
    )}`;
  };

  const addZero = (num) => {
    if (num.toString().length === 1) num = `0${num}`;
    return num;
  };

  //---------------------------------------------------------------------------------------------------------------

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

  let content = (
    <>
      <SalesTop dolar={dolar} />
      <SalesGrd />
      <SalesFoot
        handleOnClickBtn={handleOnClickBtn}
        disableFin={salesProducts.length < 1}
        disable={selectedProd.table !== "SALES"}
      />
      <Modal
        isOpen={salModalOpen}
        onRequestClose={() => setSalModalOpen(false)}
        shouldCloseOnOverlayClick={false}
        closeTimeoutMS={200}
        style={customStyles}
      >
        <SalesModal
          btnType={type}
          handleOnSubmit={handleOnSubmit}
          handleOnCancel={handleOnCancel}
        />
      </Modal>
    </>
  );

  return content;
};

export default Sales;
