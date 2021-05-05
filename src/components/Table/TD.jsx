import React from "react";
import { useSelector } from "react-redux";

const TD = ({
  text,
  type,
  column,
  id,
  handleRowSelect,
  handleOnDobleClick,
  handleKeyPress,
  handleOnChange,
}) => {
  const selectedProd = useSelector((state) => state.selectedProd);

  const style = (type, column) => {
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
    }
    if (type === "SALES") {
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
    if (type === "ESTVENTAS") {
      switch (column) {
        case "fecha":
          return { textAlign: "center" };
        case "totalPesos":
          return { textAlign: "center" };
        case "totalDolares":
          return { textAlign: "center" };
        default:
          return null;
      }
    }
    if (type === "STOCK") {
      switch (column) {
        case "id":
          return { display: "none" };
        case "descripcion":
          return { textAlign: "left", verticalAlign: "middle", width: "75%" };
        case "stock":
          return { textAlign: "center", verticalAlign: "middle", width: "25%" };
        default:
          return null;
      }
    }
    if (type === "STKHIS") {
      switch (column) {
        case "fecha":
          return { textAlign: "center", verticalAlign: "middle", width: "20%" };
        case "motivo":
          return { textAlign: "left", verticalAlign: "middle", width: "50%" };
        case "cant":
          return { textAlign: "center", verticalAlign: "middle", width: "15%" };
        case "stkfin":
          return { textAlign: "center", verticalAlign: "middle", width: "15%" };
        default:
          return null;
      }
    }
    if (type === "DET_VENTAS") {
      switch (column) {
        case "id":
          return { display: "none" };
        case "fecha":
          return { textAlign: "center", verticalAlign: "middle", width: "20%" };
        case "time":
          return { textAlign: "center", verticalAlign: "middle", width: "20%" };
        case "reference":
          return { textAlign: "center", verticalAlign: "middle", width: "30%" };
        case "totalPesos":
          return { textAlign: "right", verticalAlign: "middle", width: "15%" };
        case "totalDolares":
          return { textAlign: "right", verticalAlign: "middle", width: "15%" };
        default:
          return null;
      }
    }
    if (type === "DET_VENTAS_DET") {
      switch (column) {
        case "id":
          return { display: "none" };
        case "descripcion":
          return { textAlign: "left", verticalAlign: "middle", width: "40%" };
        case "cantidad":
          return { textAlign: "center", verticalAlign: "middle", width: "15%" };
        case "precioPesos":
          return { textAlign: "right", verticalAlign: "middle", width: "15%" };
        case "precioDolar":
          return { textAlign: "right", verticalAlign: "middle", width: "15%" };
        case "total":
          return { textAlign: "right", verticalAlign: "middle", width: "15%" };
        default:
          return null;
      }
    }
  };

  const selection = (selectedProd, idrow, usetable) => {
    let { id, table } = selectedProd;
    if (usetable !== table) return null;
    switch (table) {
      case "PRODUCTS":
        return id === idrow ? "bg-info" : null;
      case "SALES":
        return id === idrow ? "bg-info" : null;
      case "STOCK":
        return id === idrow ? "bg-info" : null;
      case "DET_VENTAS":
        return id === idrow ? "bg-info" : null;
      default:
        return null;
    }
  };

  const inpStyle = (col) => {
    switch (col) {
      case "ingreso":
        return {
          paddin: "1px",
          margin: 0,
          width: "100%",
          borderRadius: "5px",
          border: "1px solid black",
          textAlign: "center",
        };
      case "cant":
        return {
          paddin: "1px",
          margin: 0,
          width: "100%",
          borderRadius: "5px",
          border: "1px solid black",
          textAlign: "center",
        };
      default:
        return null;
    }
  };

  const handleOnClickInput = (e) => {
    e.target.select();
  };

  return (
    <td
      style={style(type, column)}
      className={selection(selectedProd, id, type)}
      onClick={() => handleRowSelect(id, type)}
      onDoubleClick={() => handleOnDobleClick(id, column, text)}
      //onKeyPress={handleKeyPress}
    >
      {column === "ingreso" || column === "cant" ? (
        <input
          id={id}
          style={inpStyle(column)}
          value={text}
          onChange={handleOnChange}
          onKeyUp={handleKeyPress}
          onClick={handleOnClickInput}
          type="text"
        />
      ) : (
        text
      )}
    </td>
  );
};

export default TD;
