import React from "react";

const Opciones = ({ handleOnClickOpt }) => {
  return (
    <div className="optionFilters">
      <h3 className="p-3">Opciones</h3>
      <button
        type="button"
        className="btn btn-light w-100 m-1"
        onClick={() => handleOnClickOpt("Ventas")}
      >
        Totales en Ventas
      </button>
      <button
        type="button"
        className="btn btn-light w-100 m-1"
        onClick={() => handleOnClickOpt("detAticulos")}
      >
        Detalles de Articulos
      </button>
      <button
        type="button"
        className="btn btn-light w-100 m-1"
        onClick={() => handleOnClickOpt("detVentas")}
      >
        Detalles de ventas
      </button>
      <button
        type="button"
        className="btn btn-light w-100 m-1"
        onClick={() => handleOnClickOpt("Stock")}
      >
        Historico de Stock
      </button>
    </div>
  );
};

export default Opciones;
