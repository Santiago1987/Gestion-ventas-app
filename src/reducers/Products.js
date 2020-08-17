import {
  ADD_PRODUCTS,
  SELECT_PROD,
  ADD_SALES_PRODUCT,
  REMOVE_SALES_PRODUCT,
  REMOVE_ALL_SALES_PRODUCTS,
} from "../actions/actionsList";

const initialProducts = [];
const initialSelect = {};
const initialSalesProducts = [];

const productsReducer = (state = initialProducts, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCTS:
      return [...state, ...payload];
    default:
      return state;
  }
};

export const selectedProdReducer = (
  state = initialSelect,
  { type, payload }
) => {
  switch (type) {
    case SELECT_PROD:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const salesProductsReducer = (
  state = initialSalesProducts,
  { type, payload }
) => {
  switch (type) {
    case ADD_SALES_PRODUCT:
      let aux = state;
      let index = aux.findIndex((sal) => sal.id === payload.id);
      console.log("state", state);
      if (index !== -1) {
        aux[index].cant++;
      } else {
        payload.cant = 1;
        aux = [...aux, payload];
      }
      console.log("aux", aux);
      return [...state, ...aux];
    case REMOVE_SALES_PRODUCT:
      return [...state, ...payload];
    case REMOVE_ALL_SALES_PRODUCTS:
      return [...state, ...[]];
    default:
      return state;
  }
};

export default productsReducer;
