import React from "react";
import { useSelector } from "react-redux";
import useTDStyles from "../../containers/hooks/TDStyles";

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

  const style = useTDStyles();

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
