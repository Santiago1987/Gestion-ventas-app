import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";

const Stock = ({ data }) => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    setDatos(data);
  }, [data]);

  let titles = {
    id: "ID",
    descripcion: "Descripcion",
    stock: "Stock",
  };
  let type = "STOCK";

  const handleRowSelect = (id, table) => {};

  const handleOnDobleClick = () => null;

  const handleOnChange = (e) => {};

  const handleKeyPress = (id, column, text) => null;

  let content = <h2>Loading....</h2>;

  if (datos.length > 0) {
    content = (
      <div className="d-flex">
        <Table
          type={type}
          titles={titles}
          items={datos}
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

export default Stock;
