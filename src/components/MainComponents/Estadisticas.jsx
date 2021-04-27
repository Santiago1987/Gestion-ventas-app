import React, { useEffect, useState } from "react";
import axios from "axios";
import Graph from "../../containers/Graphs/Graph";
import Opciones from "../../containers/Graphs/Opciones";
import Data from "../../containers/Graphs/Data";
import Filtros from "../../containers/Graphs/Filtros";

import moment from "moment";
import Stock from "../../containers/Stock/Stock";

const Estadisticas = () => {
  const {
    REACT_APP_BACKEND_URL,
    REACT_APP_ESTADISTICAS_VENTAS,
    REACT_APP_ESTADISTICAS_STOCK,
  } = process.env;

  const [data, setData] = useState([]);
  const [refresh, setFresh] = useState(false);

  const [frDate, setFrDate] = useState(
    moment(new Date()).add(-1, "months").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [opcion, setOpcion] = useState("Ventas");

  const [url, setUrl] = useState(
    `${REACT_APP_BACKEND_URL}${REACT_APP_ESTADISTICAS_VENTAS}`,
    {
      params: { frDate, toDate },
    }
  );

  useEffect(() => {
    getDatos(url);
  }, [refresh, url]);

  const handleOnClickRefresh = (ref) => {
    setFresh(ref);
  };

  const getDatos = async (url) => {
    await axios
      .get(url)
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

  const handleOnClickOpt = (type) => {
    if (type == "Ventas") {
      setUrl(`${REACT_APP_BACKEND_URL}${REACT_APP_ESTADISTICAS_VENTAS}`, {
        params: { frDate, toDate },
      });
      setOpcion(type);
      return;
    }

    if (type == "Stock") {
      setUrl(`${REACT_APP_BACKEND_URL}${REACT_APP_ESTADISTICAS_STOCK}`);
      setOpcion(type);
      return;
    }
  };

  return (
    <div className="estadisticas">
      <div className="options">
        <Opciones handleOnClickOpt={handleOnClickOpt} />
      </div>
      {opcion == "Ventas" ? (
        <>
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
              <Graph data={data} opcion={opcion} />
            </div>
            <div className="datos">
              <Data data={data} type="ESTVENTAS" />
            </div>
          </div>
        </>
      ) : (
        <div className="container-fluid w-50">
          <Stock data={data} />
        </div>
      )}
    </div>
  );
};

export default React.memo(Estadisticas);
