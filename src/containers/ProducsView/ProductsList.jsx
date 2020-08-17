import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProducts, selectProd, addSalesProduct } from "../../actions";

import Table from "../../components/Table/Table";
import products from "../../data";

const ProductsView = () => {
  const [Loading, setLoading] = useState(false);

  // Reducers
  const Products = useSelector((state) => state.Products);
  const Search = useSelector((state) => state.Search);
  const selectedProd = useSelector((state) => state.selectedProd);

  const dispatch = useDispatch();
  const dolar = 70;

  useEffect(() => {
    setLoading(true);

    let data = [...products];

    //fetching data from server
    setTimeout(() => {
      let newData = data.map((d) => ({
        ...d,
        precioFinal: Math.round(d.precio * dolar, 2),
        precio1: Math.round((d.precio * dolar) / 0.9, 2),
        precio2: Math.round(d.precio * dolar * 1.3, 2),
      }));

      dispatch(loadProducts(newData));
      setLoading(false);
    }, 3000);
  }, [products]);

  // Row selection
  const handleRowSelect = (id, table) => {
    dispatch(selectProd({ id: id, table: table }));
  };

  const handleOnDobleClick = (id) => {
    dispatch(addSalesProduct(Products.find((p) => p.id === id)));
  };

  const handleOnChange = (id) => null;

  // Columns titles
  const titles = {
    id: "id",
    numero: "#",
    stock: "Stock",
    descr: "Descripcion",
    PUS: "Precio $US",
    PF: "Precio Final",
    P1: "Precio 1",
    P2: "Precio 2",
  };

  // Initializtions
  let items = [];
  let rowN = 1;
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
      number: rowN++,
      stock: prod.stock,
      descr: prod.descripcion,
      PUS: prod.precio,
      PF: prod.precioFinal,
      P1: prod.precio1,
      P2: prod.precio2,
    }));
  }

  // Render
  let content = <p>Loading products... </p>;

  if (items.length === 0) {
    content = (
      <div className="container shadow bg-white rounded py-2">
        <Table type="PRODUCTS" titles={titles} />
      </div>
    );
  } else if (!Loading && items.length > 0) {
    content = (
      <div className="container shadow bg-white rounded py-2">
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
    );
  } else if (!Loading && !Products && Products.length === 0) {
    console.log("error feching products data from server");
    content = <p>Error feching products data from server</p>;
  }
  return content;
};

export default React.memo(ProductsView);
