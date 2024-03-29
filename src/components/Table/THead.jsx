import React from "react";
import TR from "./TR";

const THead = ({ columns, type }) => {
  const style = (type) => {
    switch (type) {
      case "PRODUCTS":
        return "thead-dark";
      case "SALES":
        return "thead-dark";
      case "STOCK":
        return "thead-dark";
      case "STKHIS":
        return "thead-dark";
      case "DET_VENTAS":
        return "thead-dark";
      case "DET_VENTAS_DET":
        return "thead-dark";
      case "SETTINGS":
        return "thead-dark";
      case "CLOSER":
        return "thead-dark";
      default:
        return null;
    }
  };

  return (
    <thead className={style(type)}>
      <TR headers={columns} type={type} />
    </thead>
  );
};

export default THead;
