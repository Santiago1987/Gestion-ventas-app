import React, { useState, useEffect } from "react";
import Table from "../../components/Table/Table";

const Data = ({ data, type }) => {
  const [datos, setDatos] = useState([]);

  let content = "";
  let titles = {};

  useEffect(() => {
    setDatos(data);
  }, [data]);

  if (type === "ESTVENTAS") {
    titles = {
      fecha: "Fecha",
      totalPesos: "Total Pesos",
      totalDolares: "Total Dolar",
    };
  }

  if (datos.length === 0) {
    content = <p>Loading...</p>;
  } else {
    content = (
      <div className="d-flex">
        <Table type={type} titles={titles} items={data} />
      </div>
    );
  }

  return content;
};

export default Data;
