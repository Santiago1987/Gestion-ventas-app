import React, { useEffect, useState } from "react";
import axios from "axios";
import Graph from "../../containers/Graphs/Graph";
import Opciones from "../../containers/Graphs/Opciones";
import Data from "../../containers/Graphs/Data";
import Filtros from "../../containers/Graphs/Filtros";

import moment from "moment";

const Estadisticas = () => {
  const [data, setData] = useState([]);
  const [refresh, setFresh] = useState(false);

  const [frDate, setFrDate] = useState(
    moment(new Date()).add(-1, "months").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const { REACT_APP_BACKEND_URL, REACT_APP_ESTADISTICAS_VENTAS } = process.env;

  useEffect(() => {
    getDatos();
  }, [refresh]);

  const handleOnClickRefresh = (ref) => {
    setFresh(ref);
  };

  const getDatos = async () => {
    await axios
      .get(`${REACT_APP_BACKEND_URL}${REACT_APP_ESTADISTICAS_VENTAS}`, {
        params: { frDate, toDate },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnChangeFrDate = (e) => {
    let { value } = e.target;
    setFrDate(value);
  };

  const handleOnChangeToDate = (e) => {
    let { value } = e.target;
    setToDate(value);
  };

  return (
    <div className="estadisticas">
      <div className="options">
        <Opciones />
      </div>
      <div className="filters">
        <Filtros
          data={data}
          refresh={refresh}
          handleOnClickRefresh={handleOnClickRefresh}
          frDate={frDate}
          toDate={toDate}
          handleOnChangeFrDate={handleOnChangeFrDate}
          handleOnChangeToDate={handleOnChangeToDate}
        />
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

export default React.memo(Estadisticas);
