import React from "react";

const Filtros = ({
  frDate,
  toDate,
  handleOnChangeFrDate,
  handleOnChangeToDate,
}) => {
  let content = (
    <div className="filters">
      <label className="filtroTitle">Filtros</label>

      <div>
        <label className="lab">Desde</label>
        <input
          itype="desde"
          className="m-2"
          type="date"
          value={frDate}
          max={toDate}
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
          min={frDate}
          onChange={handleOnChangeToDate}
        />
      </div>
    </div>
  );

  return content;
};

export default Filtros;
