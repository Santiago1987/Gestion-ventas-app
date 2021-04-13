import React, { useState, useEffect } from "react";
import LineGraph from "../../containers/Graphs/LineGraph";
import BarGraph from "../../containers/Graphs/BarGraph";

const Graph = ({ data }) => {
  const [content, setContent] = useState(<p>Loading....</p>);
  const [type, setType] = useState("Line");

  useEffect(() => {
    if (type === "Bar") setContent(<BarGraph data={data} />);
    else if (type === "Line") setContent(<LineGraph data={data} />);
  }, [data]);

  const handleOnClickBtn = (type) => {
    if (type === "Bar") {
      setContent(<BarGraph data={data} />);
      setType("Bar");
      return;
    }
    if (type === "Line") {
      setContent(<LineGraph data={data} />);
      setType("Line");
      return;
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h3 className="p-3">Grafico de linea</h3>
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
          Line Graph
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
          Bar Graph
        </button>
      </div>
      {content}
    </div>
  );
};

export default Graph;
