import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAllSalesProducts, removeSalesProduct } from "../../actions";
import Modal from "react-modal";

import SalesTop from "./SalesTop";
import SalesGrd from "./SalesGrd";
import SalesFoot from "./SalesFoot";
import SalesModal from "../../components/Modal/SalesModal";

const Sales = () => {
  const [salModalOpen, setSalModalOpen] = useState(false);
  const selectedProd = useSelector((state) => state.selectedProd);

  const dispatch = useDispatch();

  const [type, setType] = useState("");

  const handleOnClickBtn = (type, grid) => {
    if (grid !== "SALES") return;

    setType(type);
    if (type === "cancel" || type === "finish") setSalModalOpen(true);
    else if (type === "remove") dispatch(removeSalesProduct(selectedProd));
  };

  const handleOnSubmit = (type, gridType) => {
    setSalModalOpen(false);
    if (gridType !== "SALES") return;
    if (type === "cancel") dispatch(removeAllSalesProducts());
  };

  const handleOnCancel = () => {
    setSalModalOpen(false);
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

  let content = (
    <>
      <SalesTop />
      <SalesGrd />
      <SalesFoot handleOnClickBtn={handleOnClickBtn} />
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
