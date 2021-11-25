import { useDispatch, useSelector } from "react-redux";
import {
  addSalesProduct,
  loadProducts,
  selectProd,
  updateProduct,
} from "../../actions";
import axios from "axios";

const useProductGRDFunctions = () => {
  // List of products
  const productList = useSelector((state) => state.Products);

  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const { dolar, porcLocal, porcML } = settings;

  /*// Dolar price
  const dolar = 70;

  // Percentage of local increase
  const porcLocal = 10;

  // Percentage of Mercado Libre increase
  const porcML = 25;*/

  // enviroment variables: URL for backoffice
  const { REACT_APP_BACKEND_URL, REACT_APP_SAVE_STKMOV_URL } = process.env;

  // Get list of products from database
  const getListOfProducts = (data) => {
    let artlist = data.map((art) => {
      let { _id, descripcion, prDolar, stock, ingreso } = art;

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
        prMl:
          Math.round(
            (prDolar * dolar * (porcML / 100 + 1) + Number.EPSILON) * 100
          ) / 100,
      };
    });

    dispatch(loadProducts(artlist));
  };

  // Row selection
  const handleRowSelect = (id, table) => {
    dispatch(selectProd({ id, table }));
  };

  // functin to select an article for sale
  const handleOnDobleClick = (id, column) => {
    let precio = 0;
    let type = "L";
    let product = productList.find((p) => p.id === id);

    if (product === undefined) return;

    if (column === "PML") {
      precio = product.prMl;
      type = "ML";
    } else precio = product.prLocal;

    dispatch(
      addSalesProduct({
        id: product.id,
        descripcion: product.descripcion,
        precio,
        type,
      })
    );
  };

  // enter arraivals for products
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

  // manage the arraivals inputs
  const handleOnChange = (e) => {
    let { value, id } = e.target;
    let regex = new RegExp("^([0-9])*$");

    if (value.length > 5 || !regex.test(value)) return;

    let articulo = productList.find((pr) => pr.id === id);
    articulo.ingreso = value;
    dispatch(updateProduct(articulo));
  };

  return [
    getListOfProducts,
    handleRowSelect,
    handleOnDobleClick,
    handleKeyPress,
    handleOnChange,
  ];
};

export default useProductGRDFunctions;
