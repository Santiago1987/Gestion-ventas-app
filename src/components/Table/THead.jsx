import React from "react";
import TR from "./TR";

const THead = ({ columns, type }) => {
  return (
    <thead className={style(type)}>
      <TR headers={columns} type={type} />
    </thead>
  );
};

export default THead;

function style(type) {
  switch (type) {
    case "PRODUCTS":
      return "thead-dark";
    case "SALES":
      return "thead-dark";
    default:
      return null;
  }
}
