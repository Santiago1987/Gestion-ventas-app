import React from "react";
import { useSelector } from "react-redux";

import Table from "../../components/Table/Table";
import useSalesGRDFunctions from "../hooks/salesGRDFunctions";

const SalesGrd = () => {
  //------------------------------Reducers-------------------------------------------
  const salesProducts = useSelector((state) => state.salesProducts);

  //------------------------------Row functions-------------------------------------------
  const [handleRowSelect, handleOnDobleClick, handleOnChange, handleKeyPress] =
    useSalesGRDFunctions();

  //------------------------------Variables-------------------------------------------
  let titles = {
    id: "id",
    descr: "Descripcion",
    precio: "Precio c/u",
    cant: "Cantidad",
    total: "Total",
  };

  let items = [];

  items = salesProducts.map((s) => ({
    id: s.id,
    descr: s.descripcion,
    precio: s.precio,
    cant: s.cant,
    total: s.precio * s.cant,
  }));

  //------------------------------Render-------------------------------------------
  let content = <p>Loading.....</p>;

  if (salesProducts.length === 0) {
    content = (
      <>
        <div className="container shadow bg-white rounded m-1">
          <Table type="SALES" titles={titles} />
          <div className="shadow bg-white rounded salesTable">
            <Table
              type="SALES"
              items={items}
              handleRowSelect={handleRowSelect}
              handleOnDobleClick={handleOnDobleClick}
              handleOnChange={handleOnChange}
            />
          </div>
        </div>
      </>
    );
  } else if (items.length > 0) {
    content = (
      <div className="container shadow bg-white rounded m-1">
        <Table type="SALES" titles={titles} />
        <div className="shadow bg-white rounded salesTable">
          <Table
            type="SALES"
            items={items}
            handleRowSelect={handleRowSelect}
            handleOnDobleClick={handleOnDobleClick}
            handleOnChange={handleOnChange}
            handleKeyPress={handleKeyPress}
          />
        </div>
      </div>
    );
  }

  return content;
};

export default SalesGrd;
