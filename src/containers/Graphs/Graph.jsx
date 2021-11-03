import React, { useState, useEffect } from "react";
import LineGraph from "../../containers/Graphs/LineGraph";
import BarGraph from "../../containers/Graphs/BarGraph";
import GraphFooter from "../../containers/Graphs/GraphFooter";
import Data from "../Graphs/Data";

import axios from "axios";

const Graph = ({ params }) => {
  const { REACT_APP_BACKEND_URL, REACT_APP_ESTADISTICAS_VENTAS } = process.env;

  const [type, setType] = useState("Bar");
  const [moneda, setMoneda] = useState("pesos");
  const [data, setData] = useState([]);

  let content = <p>Loading....</p>;

  //const [content, setContent] = useState(<p>Loading....</p>);
  let datos = [];
  /*------------------------------------useEffect------------------------------------------ */
  useEffect(() => {
    getDatos(params);
  }, [params]);

  /*------------------------------------------------------------------------------------ */
  const getDatos = async (params) => {
    await axios
      .get(`${REACT_APP_BACKEND_URL}${REACT_APP_ESTADISTICAS_VENTAS}`, params)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return;
  };
  /*------------------------------------------------------------------------------------ */

  const handleOnClickBtn = (type) => {
    if (type === "Bar") {
      content = <BarGraph data={datos} />;
      setType("Bar");
      return;
    }
    if (type === "Line") {
      content = <LineGraph data={datos} />;
      setType("Line");
      return;
    }
  };

  const handleOnClickBtnMoneda = (type) => {
    setMoneda(type);
  };

  /*------------------------------------------------------------------------------------ */

  if (data.length > 0) {
    data.map((dat) => {
      let { fecha, totalPesos, totalDolares } = dat;

      if (moneda === "pesos") {
        datos.push({ fecha, total: totalPesos });
        return;
      }
      if (moneda === "dolar") {
        datos.push({ fecha, total: totalDolares });
        return;
      }
    });

    if (type === "Bar") {
      //setContent(<BarGraph data={datos} />);
      content = <BarGraph data={datos} />;
      return;
    }
    if (type === "Line") {
      //setContent(<LineGraph data={datos} />);
      content = <LineGraph data={datos} />;
      return;
    }
  }

  return (
    <>
      <div className="chart">
        <div className="d-flex flex-column align-items-center">
          <h3 className="p-3">Total en ventas</h3>
          <div className="d-flex">
            <button
              type="button"
              gtype="Line"
              className={
                type === "Line"
                  ? "btn btn-success btn-lg m-2"
                  : "btn btn-secondary btn-lg m-2"
              }
              style={{ width: "150px" }}
              onClick={() => handleOnClickBtn("Line")}
            >
              Lineas
            </button>
            <button
              type="button"
              gtype="Bar"
              className={
                type === "Bar"
                  ? "btn btn-success btn-lg m-2"
                  : "btn btn-secondary btn-lg m-2"
              }
              style={{ width: "150px" }}
              onClick={() => handleOnClickBtn("Bar")}
            >
              Barras
            </button>
          </div>
          {content}
          <GraphFooter
            data={datos}
            moneda={moneda}
            handleOnClickBtnMoneda={handleOnClickBtnMoneda}
          />
        </div>
      </div>
      <div className="datos">
        <Data data={data} type="ESTVENTAS" />
      </div>
    </>
  );
};

export default React.memo(Graph);
