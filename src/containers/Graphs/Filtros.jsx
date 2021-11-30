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
        <div>
          <label className="lab">Desde</label>
          <input
            itype="desde"
            className="m-2"
            type="date"
            value={frDate}
            onChange={handleOnChangeFrDate}
          />
        </div>
        <div>
          <label className="lab">Hasta</label>
          <input
            itype="hasta"
            className="m-2"
            type="date"
            value={toDate}
            onChange={handleOnChangeToDate}
          />
        </div>
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
