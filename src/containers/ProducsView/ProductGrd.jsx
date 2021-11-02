import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { iniProducts } from "../../actions";
import Table from "../../components/Table/Table";
import { useHttp } from "../hooks/http";
import useProductGRDFunctions from "../hooks/productGRDFunctions";

const ProductGrd = () => {
  // Reducers
  const Products = useSelector((state) => state.Products);
  const Search = useSelector((state) => state.Search);

  const [
    getListOfProducts,
    handleRowSelect,
    handleOnDobleClick,
    handleKeyPress,
    handleOnChange,
  ] = useProductGRDFunctions();

  const { REACT_APP_BACKEND_URL, REACT_APP_ARTICLE_LIST_URL } = process.env;

  const dispatch = useDispatch();

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
      getListOfProducts(data);
    }
  }, [getData]);

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
      PML: prod.prMl,
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
