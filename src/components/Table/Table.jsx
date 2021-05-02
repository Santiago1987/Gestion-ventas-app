import React from "react";

import TBody from "./TBody";
import THead from "./THead";

const Table = ({
  type = "",
  titles = [],
  items = [],
  handleRowSelect,
  //selectedProd = {},
  handleOnDobleClick,
  handleKeyPress,
  handleOnChange,
}) => {
  return (
    <table className={style(type)} style={{ margin: 0, width: "100%" }}>
      {Object.keys(titles).length > 0 ? (
        <THead columns={titles} type={type} />
      ) : null}
      {items.length > 0 ? (
        <TBody
          columns={items}
          type={type}
          handleRowSelect={handleRowSelect}
          //selectedProd={selectedProd}
          handleKeyPress={handleKeyPress}
          handleOnDobleClick={handleOnDobleClick}
          handleOnChange={handleOnChange}
        />
      ) : null}
    </table>
  );
};

export default Table;

function style(type) {
  switch (type) {
    case "PRODUCTS":
      return "table table-hover";
    case "SALES":
      return "table table-hover";
    case "ESTVENTAS":
      return "table table-striped";
    case "STOCK":
      return "table table-hover";
    case "STKHIS":
      return "table table-striped";
    case "DET_VENTAS":
      return "table table-hover";
    case "DET_VENTAS_DET":
      return "table table-hover";
    default:
      return null;
  }
}
