import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAllSalesProducts } from "../../actions";

import SalesTop from "./SalesTop";
import SalesGrd from "./SalesGrd";
import SalesFoot from "./SalesFoot";

const Sales = () => {
  const salesProducts = useSelector((state) => state.salesProducts);
  const selectedProd = useSelector((state) => state.selectedProd);

  const dispatch = useDispatch();

  const handleOnClickBtn = (type, grid) => {
    if (grid !== "SALES") return;

    if (type === "cancel") {
      dispatch(removeAllSalesProducts());
      console.log("selectedProd", selectedProd);
    } else if (type === "remove") {
      console.log("selectedProd", selectedProd);
    } else if (type === "finish") {
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
