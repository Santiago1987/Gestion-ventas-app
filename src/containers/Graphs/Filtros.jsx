import React from "react";

const Filtros = ({
  refresh,
  handleOnClickRefresh,
  frDate,
  toDate,
  handleOnChangeFrDate,
  handleOnChangeToDate,
}) => {
  let content = (
    <div className="d-flex justify-content-between w-75">
      <h3 className="">Filtros</h3>
      <div className="fechas">
        <label className="">Desde</label>
        <input
          itype="desde"
          className="m-2"
          type="date"
          value={frDate}
          onChange={handleOnChangeFrDate}
        />

        <h4 className="">Hasta</h4>
        <input
          itype="hasta"
          className="m-2"
          type="date"
          value={toDate}
          onChange={handleOnChangeToDate}
        />
      </div>
      <button
        className="btn btn-primary btn-lg"
        onClick={() => handleOnClickRefresh(!refresh)}
      >
        Refresh
      </button>
    </div>
  );

  return content;
};

export default Filtros;
