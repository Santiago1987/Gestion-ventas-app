import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProd } from "../../actions/";

import Table from "../../components/Table/Table";

const SalesGrd = () => {
  //------------------------------Reducers-------------------------------------------
  const salesProducts = useSelector((state) => state.salesProducts);
  //const selectedProd = useSelector((state) => state.selectedProd);

  const dispatch = useDispatch();

  //------------------------------Row functions-------------------------------------------
  const handleRowSelect = (id, table) => {
    dispatch(selectProd({ id: id, table: table }));
  };

  const handleOnDobleClick = () => null;

  const handleOnChange = (id) => null;

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
              //selectedProd={selectedProd}
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
            //selectedProd={selectedProd}
          />
        </div>
      </div>
    );
  }

  return content;
};

export default SalesGrd;
