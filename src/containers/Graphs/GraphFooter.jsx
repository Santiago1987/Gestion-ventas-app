import React from "react";

const GraphFooter = ({ data, moneda, handleOnClickBtnMoneda }) => {
  let content = <div></div>;

  if (data.lenght !== 0) {
    content = (
      <div className="d-flex">
        <button
          type="button"
          className={
            moneda === "pesos" ? "btn btn-info m-2" : "btn btn-secondary m-2"
          }
          style={{ width: "150px" }}
          onClick={() => handleOnClickBtnMoneda("pesos")}
        >
          Pesos
        </button>
        <button
          type="button"
          gtype="Bar"
          className={
            moneda === "dolar" ? "btn btn-info m-2" : "btn btn-secondary m-2"
          }
          style={{ width: "150px" }}
          onClick={() => handleOnClickBtnMoneda("dolar")}
        >
          Dolares
        </button>
      </div>
    );
  }

  return content;
};

export default GraphFooter;
