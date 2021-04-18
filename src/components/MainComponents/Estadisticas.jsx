import React, { useEffect, useState } from "react";
import Graph from "../../containers/Graphs/Graph";
import Opciones from "../../containers/Graphs/Opciones";
import Data from "../../containers/Graphs/Data";
import { useHttp } from "../../containers/hooks/http";

const Estadisticas = () => {
  const [data, setData] = useState([]);

  const { REACT_APP_BACKEND_URL, REACT_APP_ESTADISTICAS_VENTAS } = process.env;

  const [Loading, getData] = useHttp(
    `${REACT_APP_BACKEND_URL}${REACT_APP_ESTADISTICAS_VENTAS}`,
    [],
    "GET",
    null
  );

  useEffect(() => {
    if (getData !== null) {
      let { data } = getData;
      setData(data);
    }
  }, [getData]);

  console.log("Loading", Loading);

  return (
    <div className="estadisticas">
      <div className="options">
        <Opciones />
      </div>
      <div className="filters">
        <h3>Filtros</h3>
      </div>
      <div className="grafico">
        <div className="chart">
          <Graph data={data} />
        </div>
        <div className="datos">
          <Data data={data} type="ESTVENTAS" />
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
