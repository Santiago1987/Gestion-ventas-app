import React, { useState, useEffect } from "react";
import LineGraph from "../../containers/Graphs/LineGraph";
import BarGraph from "../../containers/Graphs/BarGraph";
import GraphFooter from "../../containers/Graphs/GraphFooter";
import Data from "../Graphs/Data";

import axios from "axios";

const Graph = ({ url, params }) => {
  //const [content, setContent] = useState(<p>Loading....</p>);
  const [type, setType] = useState("Bar");
  const [moneda, setMoneda] = useState("pesos");
  const [data, setData] = useState([]);
  const [content, setContent] = useState(<p>Loading....</p>);

  let datos = [];

  /*------------------------------------useEffect------------------------------------------ */
  useEffect(() => {
    console.log("fredate", params);
    if (url) getDatos(url, params);
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
        setContent(<BarGraph data={datos} />);
        return;
      }
      if (type === "Line") {
        setContent(<LineGraph data={datos} />);
        return;
      }
    }
  }, [type, moneda, data]);

  /*------------------------------------------------------------------------------------ */
  const getDatos = async (url, params) => {
    await axios
      .get(url, params)
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
      setContent(<BarGraph data={datos} />);
      setType("Bar");
      return;
    }
    if (type === "Line") {
      setContent(<LineGraph data={datos} />);
      setType("Line");
      return;
    }
  };

  const handleOnClickBtnMoneda = (type) => {
    setMoneda(type);
  };

  /*------------------------------------------------------------------------------------ */

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
