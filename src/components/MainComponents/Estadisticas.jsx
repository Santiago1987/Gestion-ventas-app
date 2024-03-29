import React, { useEffect, useState } from "react";

import Graph from "../../containers/Graphs/Graph";
import Opciones from "../../containers/Graphs/Opciones";

import Filtros from "../../containers/Graphs/Filtros";
import VentasDetalle from "../../containers/Detalle Ventas/VentasDetalle";

import moment from "moment";
import Stock from "../../containers/Stock/Stock";

const Estadisticas = () => {
  const [frDate, setFrDate] = useState(
    moment(new Date()).add(-1, "months").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [opcion, setOpcion] = useState("Ventas");

  const [params, setParams] = useState({
    params: { frDate, toDate, detalle: false },
  });

  useEffect(() => {
    let { detalle } = params.params;
    setParams({
      params: { frDate, toDate, detalle },
    });
  }, [frDate, toDate]);

  const handleOnChangeFrDate = (e) => {
    let { value } = e.target;
    setFrDate(value);
  };

  const handleOnChangeToDate = (e) => {
    let { value } = e.target;
    setToDate(value);
  };

  const handleOnClickOpt = (type) => {
    setOpcion("");
    if (type === "Ventas") {
      setParams({
        params: { frDate, toDate, detalle: false },
      });

      setOpcion(type);
      return;
    }

    if (type === "Stock") {
      setParams({});
      setOpcion(type);
      return;
    }
    if (type === "detVentas") {
      setParams({
        params: { frDate, toDate, detalle: true },
      });
      setOpcion(type);
      return;
    }
  };

  /*------------------------------------CONTENT------------------------------------------ */
  let content = (
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
  if (opcion === "Ventas") {
    content = (
      <>
        <Filtros
          frDate={frDate}
          toDate={toDate}
          handleOnChangeFrDate={handleOnChangeFrDate}
          handleOnChangeToDate={handleOnChangeToDate}
        />
        <div className="grafico">
          <Graph params={params} />
        </div>
      </>
    );
  }

  if (opcion === "Stock") {
    content = (
      <div className="container-fluid">
        <Stock />
      </div>
    );
  }

  if (opcion === "detVentas") {
    content = (
      <>
        <Filtros
          frDate={frDate}
          toDate={toDate}
          handleOnChangeFrDate={handleOnChangeFrDate}
          handleOnChangeToDate={handleOnChangeToDate}
        />

        <div className="container-fluid">
          <VentasDetalle params={params} />
        </div>
      </>
    );
  }

  return (
    <div className="estadisticas">
      <div className="options">
        <Opciones handleOnClickOpt={handleOnClickOpt} />
      </div>
      {content}
    </div>
  );
};

export default Estadisticas;
