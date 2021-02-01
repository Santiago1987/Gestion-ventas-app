import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAllSalesProducts, removeSalesProduct } from "../../actions";
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

  const dispatch = useDispatch();

  const [type, setType] = useState("");

  //---------------------------------------------------------------------------------------------------------------

  const handleOnClickBtn = (type, grid) => {
    if (grid !== "SALES" || salesProducts.length < 1) return;
    if (type === "remove" && salesProducts.table !== "SALES") return;

    setType(type);
    if (type === "cancel" || type === "finish") setSalModalOpen(true);
    else if (type === "remove") dispatch(removeSalesProduct(selectedProd));
  };

  const handleOnSubmit = (type, gridType) => {
    setSalModalOpen(false);
    if (gridType !== "SALES") return;

    if (type === "cancel") dispatch(removeAllSalesProducts());

    if (type === "finish") {
      let date = new Date();
      let artLines = [];
      let totUS = 0;

      salesProducts.map((p) => {
        let { id, descr, precio, cant } = p;
        let prod = Products.find((pr) => pr.id === id);
        totUS = prod.PUS * cant + totUS; //chequear esto

        artLines.push({
          id,
          descr,
          precioPesos: precio,
          precioDolar: prod.PUS,
          cant,
          total: precio * cant,
        });
      });

      let total = salesProducts.reduce((acum, s) => {
        return s.precio * s.cant + acum;
      }, 0);

      let ticket = {
        refNum: getRefNum(date, "001"),
        fecha: getFecha(date),
        totalPesos: total,
        totlaDolares: total,
        Descuento: 0,
        lines: artLines,
      };

      console.log("ticket", ticket);
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
    return `${addZero(date.getDate())}/${addZero(
      date.getMonth() + 1
    )}/${date.getFullYear()} ${addZero(date.getHours())}:${addZero(
      date.getMinutes()
    )}:${addZero(date.getSeconds())}`;
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
      <SalesTop />
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
