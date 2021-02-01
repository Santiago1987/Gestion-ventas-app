import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProducts, selectProd, addSalesProduct } from "../../actions";

import Table from "../../components/Table/Table";
import { useHttp } from "../hooks/http";

const ProductGrd = () => {
  // Reducers
  const Products = useSelector((state) => state.Products);
  const selectedProd = useSelector((state) => state.selectedProd);
  const Search = useSelector((state) => state.Search);

  const dispatch = useDispatch();
  const dolar = 70;
  const porcLocal = 10;
  const porcML = 25;

  //const [Loading, setLoading] = useState(true);
  const [Loading, getData] = useHttp(
    "http://localhost:3000/api/article/list",
    [],
    "GET",
    null
  );

  useEffect(() => {
    if (getData !== null) {
      let { data } = getData;
      let Artlist = data.map((d) => {
        let { _id, descripcion, prDolar, stock, ingreso } = d;

        return {
          id: _id,
          descripcion,
          prDolar,
          stock,
          ingreso,
          prPesos: Math.round(prDolar * dolar, 2),
          prLocal: Math.round((prDolar * dolar) / ((100 - 10) / porcLocal), 2),
          prML: Math.round(prDolar * dolar * (porcML / 100 + 1), 2),
        };
      });
      dispatch(loadProducts(Artlist));
    }
  }, [getData]);

  // Row selection
  const handleRowSelect = (id, table) => {
    dispatch(selectProd({ id: id, table: table }));
  };

  const handleOnDobleClick = (id, column) => {
    let precio = 0;
    let articulo = Products.find((p) => p.id === id);

    if (column === "PML") presio = articulo.PML;
    else presio = articulo.PL;

    dispatch(
      addSalesProduct({
        id: articulo.id,
        descripcion: articulo.descripcion,
        precio,
      })
    );
  };

  const handleOnChange = (id, column) => null;

  // Columns titles
  const titles = {
    id: "id",
    ingreso: "Ingreso",
    stock: "Stock",
    descr: "Descripcion",
    PUS: "Precio $US",
    PP: "Precio pesos",
    PL: "Precio local",
    PML: "Precio ML",
  };

  // Initializtions
  let items = [];
  let filteredProd = [];

  // Search funcionality
  if (Search === "") {
    filteredProd = Products;
  } else {
    filteredProd = Products.filter((prod) => {
      return prod.descripcion.toLowerCase().includes(Search.toLowerCase());
    });
  }

  // Products
  if (filteredProd.length > 0) {
    items = filteredProd.map((prod) => ({
      id: prod.id,
      ingreso: prod.ingreso,
      stock: prod.stock,
      descr: prod.descripcion,
      PUS: prod.prDolar,
      PP: prod.prPesos,
      PL: prod.prLocal,
      PML: prod.prML,
    }));
  }

  // Render
  let content = (
    <>
      <div className="row container shadow bg-white rounded m-1">
        <Table type="PRODUCTS" titles={titles} />
        <p>Loading products... </p>
      </div>
    </>
  );

  if (!Loading && items.length > 0) {
    content = (
      <>
        <div className="container shadow bg-white rounded m-1">
          <Table type="PRODUCTS" titles={titles} />
          <div className="shadow bg-white rounded prodTable">
            <Table
              type="PRODUCTS"
              items={items}
              handleRowSelect={handleRowSelect}
              selectedProd={selectedProd}
              handleOnDobleClick={handleOnDobleClick}
              handleOnChange={handleOnChange}
            />
          </div>
        </div>
      </>
    );
  } else if (!Loading && !Products && Products.length === 0) {
    console.log("error feching products data from server");
    content = <p>Error feching products data from server</p>;
  }

  return content;
};

export default React.memo(ProductGrd);
