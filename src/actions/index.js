import {
  ADD_SEARCH,
  SELECT_PROD,
  ADD_PRODUCTS,
  ADD_SALES_PRODUCT,
  REMOVE_SALES_PRODUCT,
  REMOVE_ALL_SALES_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_SALES_PRODUCT,
  SET_DOLAR,
  INI_PRODUCTS,
} from "./actionsList";

export const loadProducts = (products) => ({
  type: ADD_PRODUCTS,
  payload: products,
});

export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product,
});

export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  payload: id,
});

export const searchInput = (input) => ({
  type: ADD_SEARCH,
  payload: input,
});

export const selectProd = (select) => ({
  type: SELECT_PROD,
  payload: select,
});

export const addSalesProduct = (salesProd) => ({
  type: ADD_SALES_PRODUCT,
  payload: salesProd,
});

export const removeSalesProduct = (salesProd) => ({
  type: REMOVE_SALES_PRODUCT,
  payload: salesProd,
});

export const removeAllSalesProducts = () => ({
  type: REMOVE_ALL_SALES_PRODUCTS,
  payload: [],
});

export const updateSalesProduct = (salesProd) => ({
  type: UPDATE_SALES_PRODUCT,
  payload: salesProd,
});

export const setDolar = (value) => ({
  type: SET_DOLAR,
  payload: value,
});

export const iniProducts = () => ({
  type: INI_PRODUCTS,
  payload: null,
});
