import React from "react";
import Graph from "../../containers/Graphs/Graph";

const Estadisticas = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className="estadisticas">
      <div className="options">
        <div className="optionFilters">
          <h3>Opciones</h3>
        </div>
      </div>
      <div className="filters">
        <h3>Filtros</h3>
      </div>
      <div className="grafico">
        <div className="chart">
          <Graph data={data} />
        </div>
        <div className="datos">Lorem ipsum dolor sit.</div>
      </div>
    </div>
  );
};

export default Estadisticas;
