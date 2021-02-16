import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProd, updateSalesProduct } from "../../actions/";

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

  const handleOnChange = (e) => {
    let { value, id } = e.target;
    let regex = new RegExp("^([0-9])*$");

    if (value.length > 5 || !regex.test(value)) return;
    let articulo = salesProducts.find((pr) => pr.id === id);
    articulo.cant = value;
    dispatch(updateSalesProduct(articulo));
  };

  const handleKeyPress = (id, column, text) => null;

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
            //selectedProd={selectedProd}
            handleKeyPress={handleKeyPress}
          />
        </div>
      </div>
    );
  }

  return content;
};

export default SalesGrd;
