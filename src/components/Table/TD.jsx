import React from "react";

const TD = ({
  text,
  type,
  column,
  id,
  handleRowSelect,
  selectedProd,
  handleOnDobleClick,
  handleOnChange,
}) => {
  return (
    <td
      style={style(type, column)}
      className={selection(selectedProd, id)}
      onClick={() => handleRowSelect(id, type)}
      onDoubleClick={() => handleOnDobleClick(id)}
      contentEditable={column === "cant" ? true : false}
      suppressContentEditableWarning="true"
      onChange={() => handleOnChange(id)}
    >
      {text}
    </td>
  );
};

export default TD;

function style(type, column) {
  if (type === "PRODUCTS") {
    switch (column) {
      case "id":
        return { display: "none" };
      case "numero":
        return { width: "5%", textAlign: "center" };
      case "stock":
        return { width: "10%", textAlign: "center" };
      case "descr":
        return { width: "29%", textAlign: "start" };
      case "PUS":
      case "PF":
      case "P1":
      case "P2":
        return { width: "14%", textAlign: "center" };
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

function selection(selectedProd, idrow) {
  let { id, table } = selectedProd;

  if (table === "PRODUCTS") {
    if (id === idrow) return "bg-primary";
  }

  return null;
}
