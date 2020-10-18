import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAllSalesProducts, removeSalesProduct } from "../../actions";

import SalesTop from "./SalesTop";
import SalesGrd from "./SalesGrd";
import SalesFoot from "./SalesFoot";

const Sales = () => {
  const selectedProd = useSelector((state) => state.selectedProd);

  const dispatch = useDispatch();

  const handleOnClickBtn = (type, grid) => {
    if (grid !== "SALES") return;

    if (type === "cancel") dispatch(removeAllSalesProducts());
    else if (type === "remove") dispatch(removeSalesProduct(selectedProd));
    else if (type === "finish") {
    }
  };

  let content = (
    <>
      <SalesTop />
      <SalesGrd />
      <SalesFoot handleOnClickBtn={handleOnClickBtn} />
    </>
  );

  return content;
};

export default Sales;
