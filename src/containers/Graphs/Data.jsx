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

  const handleRowSelect = (id, table) => {};

  const handleOnDobleClick = () => null;

  const handleOnChange = (e) => {};

  const handleKeyPress = (id, column, text) => null;

  if (datos.length === 0) {
    content = <p>Loading...</p>;
  } else {
    content = (
      <div className="d-flex">
        <Table
          type={type}
          titles={titles}
          items={data}
          handleRowSelect={handleRowSelect}
          handleOnDobleClick={handleOnDobleClick}
          handleOnChange={handleOnChange}
          handleKeyPress={handleKeyPress}
        />
      </div>
    );
  }

  return content;
};

export default Data;
