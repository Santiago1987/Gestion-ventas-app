import {
  ADD_PRODUCTS,
  SELECT_PROD,
  ADD_SALES_PRODUCT,
  REMOVE_SALES_PRODUCT,
  REMOVE_ALL_SALES_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_SALES_PRODUCT,
  INI_PRODUCTS,
} from "../actions/actionsList";

const initialProducts = [];
const initialSelect = { id: "", table: "" };
const initialSalesProducts = [];

/*
salProd:{id,ingreso,stock,descr,PUS,PP,PL,PML}
*/
const productsReducer = (state = initialProducts, { type, payload }) => {
  let idx = null;
  switch (type) {
    case ADD_PRODUCTS:
      return [...state, ...payload];
    case UPDATE_PRODUCT:
      idx = state.findIndex((s) => s.id === payload.id);
      if (idx === -1) return state;

      let { descripcion, prDolar, stock, ingreso } = payload;

      return [
        ...state.slice(0, idx),
        { ...state[idx], descripcion, prDolar, stock, ingreso },
        ...state.slice(idx + 1),
      ];
    case DELETE_PRODUCT:
      idx = state.findIndex((s) => s.id === payload);
      if (idx === -1) return state;
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    case INI_PRODUCTS:
      return [];
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
  let idx = null;
  switch (type) {
    case ADD_SALES_PRODUCT:
      let index = state.findIndex(
        (sal) => sal.id === payload.id && sal.type === payload.type
      );
      if (index === -1) {
        payload.cant = 1;
        return [...state, payload];
      }

      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], state[index].cant++),
        ...state.slice(index + 1),
      ];
    case REMOVE_SALES_PRODUCT:
      return state.filter((st) => st.id !== payload.id);
    case REMOVE_ALL_SALES_PRODUCTS:
      return [];
    case UPDATE_SALES_PRODUCT:
      idx = state.findIndex((s) => s.id === payload.id);
      if (idx === -1) return state;

      let { descr, precio, cant, total } = payload;

      return [
        ...state.slice(0, idx),
        { ...state[idx], descr, precio, cant, total },
        ...state.slice(idx + 1),
      ];
    default:
      return state;
  }
};

export default productsReducer;
