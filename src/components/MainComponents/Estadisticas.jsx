import React, { useEffect, useState } from "react";
import axios from "axios";
import Graph from "../../containers/Graphs/Graph";
import Opciones from "../../containers/Graphs/Opciones";
import Data from "../../containers/Graphs/Data";
import Filtros from "../../containers/Graphs/Filtros";
import VentasDetalle from "../../containers/Detalle Ventas/VentasDetalle";

import moment from "moment";
import Stock from "../../containers/Stock/Stock";

const Estadisticas = () => {
  const {
    REACT_APP_BACKEND_URL,
    REACT_APP_ESTADISTICAS_VENTAS,
    REACT_APP_ESTADISTICAS_STOCK,
  } = process.env;

  const [refresh, setFresh] = useState(false);

  const [frDate, setFrDate] = useState(
    moment(new Date()).add(-1, "months").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [opcion, setOpcion] = useState("Ventas");

  const [url, setUrl] = useState(
    `${REACT_APP_BACKEND_URL}${REACT_APP_ESTADISTICAS_VENTAS}`,
    {
      params: { frDate, toDate, detalle: false },
    }
  );
  const [params, setParams] = useState({
    params: { frDate, toDate, detalle: false },
  });

  useEffect(() => {
    setUrl(null);
    let { detalle } = params.params;

    setParams({
      params: { frDate, toDate, detalle },
    });
    console.log("fredate", frDate);
  }, [url, refresh]);

  const handleOnClickRefresh = (ref) => {
    setFresh(ref);
  };

  const handleOnChangeFrDate = (e) => {
    let { value } = e.target;
    setFrDate(value);
  };

  const handleOnChangeToDate = (e) => {
    let { value } = e.target;
    setToDate(value);
  };

  const handleOnClickOpt = (type) => {
    //porblema quie cuando cambia la url todavia no cambio el tipo y hay cmponente que reciben mnas el data
    if (type === "Ventas") {
      setParams({
        params: { frDate, toDate, detalle: false },
      });
      setUrl(`${REACT_APP_BACKEND_URL}${REACT_APP_ESTADISTICAS_VENTAS}`);
      setOpcion(type);
      return;
    }

    if (type === "Stock") {
      setParams({});
      setUrl(`${REACT_APP_BACKEND_URL}${REACT_APP_ESTADISTICAS_STOCK}`);
      setOpcion(type);
      return;
    }
    if (type === "detVentas") {
      setParams({
        params: { frDate, toDate, detalle: true },
      });
      setUrl(`${REACT_APP_BACKEND_URL}${REACT_APP_ESTADISTICAS_VENTAS}`);
      setOpcion(type);
      return;
    }
  };

  /*------------------------------------CONTENT------------------------------------------ */
  let content = <p>Loading...</p>;
  if (opcion === "Ventas") {
    content = (
      <>
        <div className="filters">
          <Filtros
            refresh={refresh}
            handleOnClickRefresh={handleOnClickRefresh}
            frDate={frDate}
            toDate={toDate}
            handleOnChangeFrDate={handleOnChangeFrDate}
            handleOnChangeToDate={handleOnChangeToDate}
          />
        </div>
        <div className="grafico">
          <Graph url={url} params={params} />
        </div>
      </>
    );
  }
  if (opcion === "Stock") {
    content = (
      <div className="container-fluid">
        <Stock url={url} params={params} />
      </div>
    );
  }

  if (opcion === "detVentas") {
    content = (
      <>
        <div className="filters">
          <Filtros
            refresh={refresh}
            handleOnClickRefresh={handleOnClickRefresh}
            frDate={frDate}
            toDate={toDate}
            handleOnChangeFrDate={handleOnChangeFrDate}
            handleOnChangeToDate={handleOnChangeToDate}
          />
        </div>
        <div className="container-fluid">
          <VentasDetalle url={url} params={params} />
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

export default React.memo(Estadisticas);
