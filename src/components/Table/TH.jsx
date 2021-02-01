import React from "react";

const TH = ({ text, type, column }) => {
  return (
    <th style={style(type, column)} scope="col">
      {text}
    </th>
  );
};

export default TH;

function style(type, column) {
  if (type === "PRODUCTS") {
    switch (column) {
      case "id":
        return { display: "none" };
      case "ingreso":
        return { width: "5%", textAlign: "center" };
      case "stock":
        return { width: "10%", textAlign: "center" };
      case "descr":
        return { width: "29%", textAlign: "start" };
      case "PUS":
      case "PP":
      case "PL":
      case "PML":
        return { width: "14%", textAlign: "start" };
      default:
        return null;
    }
  } else if (type === "SALES") {
    switch (column) {
      case "id":
        return { width: "5%", textAlign: "center", display: "none" };
      case "descr":
        return { width: "44%", textAlign: "start" };
      case "precio":
      case "cant":
      case "total":
        return { width: "14%", textAlign: "center" };
      default:
        return null;
    }
  }
}
