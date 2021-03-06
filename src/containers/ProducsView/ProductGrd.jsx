import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadProducts,
  selectProd,
  addSalesProduct,
  updateProduct,
  iniProducts,
} from "../../actions";
import axios from "axios";

import Table from "../../components/Table/Table";
import { useHttp } from "../hooks/http";

const ProductGrd = () => {
  // Reducers
  const Products = useSelector((state) => state.Products);
  //const selectedProd = useSelector((state) => state.selectedProd);
  const Search = useSelector((state) => state.Search);
  const {
    REACT_APP_BACKEND_URL,
    REACT_APP_ARTICLE_LIST_URL,
    REACT_APP_SAVE_STKMOV_URL,
  } = process.env;

  const dispatch = useDispatch();
  const dolar = 70;
  const porcLocal = 10;
  const porcML = 25;

  //const [Loading, setLoading] = useState(true);
  const [Loading, getData] = useHttp(
    `${REACT_APP_BACKEND_URL}${REACT_APP_ARTICLE_LIST_URL}`,
    [],
    "GET",
    null
  );

  useEffect(() => {
    dispatch(iniProducts());
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
          prPesos: Math.round((prDolar * dolar + Number.EPSILON) * 100) / 100,
          prLocal:
            Math.round(
              ((prDolar * dolar) / ((100 - porcLocal) / 100) + Number.EPSILON) *
                100
            ) / 100,
          prML:
            Math.round(
              (prDolar * dolar * (porcML / 100 + 1) + Number.EPSILON) * 100
            ) / 100,
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
    let type = "L";
    let articulo = Products.find((p) => p.id === id);

    if (column === "PML") {
      precio = articulo.prML;
      type = "ML";
    } else precio = articulo.prLocal;

    dispatch(
      addSalesProduct({
        id: articulo.id,
        descripcion: articulo.descripcion,
        precio,
        type,
      })
    );
  };

  const handleKeyPress = async (e) => {
    let { key } = e;
    let { value, id } = e.target;
    let response = null;

    if (key === "Enter") {
      await axios
        .post(`${REACT_APP_BACKEND_URL}${REACT_APP_SAVE_STKMOV_URL}`, {
          id,
          cant: value,
        })
        .then((res) => {
          response = res.data;
        })
        .catch((err) => {
          console.log("error", err);
        });
      let { _id, descripcion, ingreso, prDolar, stock } = response;
      if (_id === 0) return; //errrrorrr
      dispatch(
        updateProduct({ id: _id, descripcion, ingreso, prDolar, stock })
      );
    }
  };

  const handleOnChange = (e) => {
    let { value, id } = e.target;
    let regex = new RegExp("^([0-9])*$");

    if (value.length > 5 || !regex.test(value)) return;

    let articulo = Products.find((pr) => pr.id === id);
    articulo.ingreso = value;
    dispatch(updateProduct(articulo));
  };

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
              //selectedProd={selectedProd}
              handleOnDobleClick={handleOnDobleClick}
              handleKeyPress={handleKeyPress}
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
