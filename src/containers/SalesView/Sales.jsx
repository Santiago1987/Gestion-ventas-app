import React, { useState } from "react";
import Table from "../../components/Table/Table";
import { useSelector, useDispatch } from "react-redux";

import { selectProd } from "../../actions";

const Sales = () => {
  //Reducers
  const salesProducts = useSelector((state) => state.salesProducts);
  const selectedProd = useSelector((state) => state.selectedProd);

  const dispatch = useDispatch();

  // Row selection
  const handleRowSelect = (id, table) => {
    dispatch(selectProd({ id: id, table: table }));
  };

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
      <>
        <div className="mb-2 shadow bg-white rounded mt-2"></div>
        <div className="container shadow bg-white rounded py-2">
          <Table type="SALES" titles={titles} />
          <div className="shadow bg-white rounded salesTable">
            <Table
              type="SALES"
              items={items}
              handleRowSelect={handleRowSelect}
              handleOnDobleClick={handleOnDobleClick}
              selectedProd={selectedProd}
            />
          </div>
        </div>
        <div
          className="col-sm shadow bg-white rounded m-3"
          styles={{ height: "60px" }}
        ></div>
      </>
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
            selectedProd={selectedProd}
          />
        </div>
      </div>
    );
  }

  return content;
};

export default Sales;
