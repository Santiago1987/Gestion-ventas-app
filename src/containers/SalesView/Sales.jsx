import React from "react";
import SalesTop from "./SalesTop";
import SalesGrd from "./SalesGrd";
import SalesFoot from "./SalesFoot";

const Sales = () => {
  const handleOnClickBtn = () => {};

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
