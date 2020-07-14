import React, { useState } from "react";
import Table from "../../components/Table/Table";
import { useSelector, useDistpatch } from "react-redux";

const Sales = () => {
  //Reducers
  const salesProducts = useSelector((state) => state.salesProducts);

  // Row selection
  const handleRowSelect = () => null;

  const handleOnDobleClick = () => null;

  const handleOnChange = (id) => null;

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

  let content = <p>Loading.....</p>;

  if (salesProducts.length === 0) {
    content = (
      <div className="container shadow bg-white rounded py-2">
        <Table type="SALES" titles={titles} />
        <div className="shadow bg-white rounded salesTable">
          <Table
            type="SALES"
            items={items}
            handleRowSelect={handleRowSelect}
            handleOnDobleClick={handleOnDobleClick}
          />
        </div>
      </div>
    );
  } else if (items.length > 0) {
    content = (
      <div className="container shadow bg-white rounded py-2">
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
    );
  }

  return content;
};

export default Sales;
