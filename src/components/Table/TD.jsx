import React from "react";
import { useSelector } from "react-redux";

const TD = ({
  text,
  type,
  column,
  id,
  handleRowSelect,
  handleOnDobleClick,
  handleOnChange,
}) => {
  const selectedProd = useSelector((state) => state.selectedProd);
  return (
    <td
      style={style(type, column)}
      className={selection(selectedProd, id, type)}
      onClick={() => handleRowSelect(id, type)}
      onDoubleClick={() => handleOnDobleClick(id, column)}
      contentEditable={column === "cant" || column === "ingreso" ? true : false}
      suppressContentEditableWarning="true"
      onChange={() => handleOnChange(id, column)}
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
      case "ingreso":
        return { width: "10%", textAlign: "center", verticalAlign: "middle" };
      case "stock":
        return { width: "10%", textAlign: "center", verticalAlign: "middle" };
      case "descr":
        return { width: "24%", textAlign: "start", verticalAlign: "middle" };
      case "PUS":
      case "PP":
      case "PL":
      case "PML":
        return { width: "14%", textAlign: "right", verticalAlign: "middle" };
      default:
        return null;
    }
  } else if (type === "SALES") {
    switch (column) {
      case "id":
        return {
          width: "5%",
          textAlign: "center",
          display: "none",
          verticalAlign: "middle",
        };
      case "descr":
        return { width: "44%", textAlign: "start", verticalAlign: "middle" };
      case "precio":
      case "cant":
      case "total":
        return { width: "14%", textAlign: "center", verticalAlign: "middle" };
      default:
        return null;
    }
  }
}

function selection(selectedProd, idrow, usetable) {
  let { id, table } = selectedProd;
  if (usetable !== table) return null;
  switch (table) {
    case "PRODUCTS":
      return id === idrow ? "bg-primary" : null;
    case "SALES":
      return id === idrow ? "bg-success" : null;
    default:
      return null;
  }
}
