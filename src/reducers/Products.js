import {
  ADD_PRODUCTS,
  SELECT_PROD,
  ADD_SALES_PRODUCT,
  REMOVE_SALES_PRODUCT,
  REMOVE_ALL_SALES_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../actions/actionsList";

const initialProducts = [];
const initialSelect = {};
const initialSalesProducts = [];

const productsReducer = (state = initialProducts, { type, payload }) => {
  let idx = null;
  switch (type) {
    case ADD_PRODUCTS:
      return [...state, ...payload];
    case UPDATE_PRODUCT:
      idx = state.findIndex((s) => (s.id = payload.id));
      if (idx === -1) return state;

      let { descripcion, precio, stock } = payload;
      return [
        ...state.slice(0, idx - 1),
        { ...state[idx], descripcion, precio, stock },
        ...state.slice(idx + 1),
      ];
    case DELETE_PRODUCT:
      idx = state.findIndex((s) => (s.id = payload));
      if (idx === -1) return state;
      return [...state.slice(0, idx - 1), ...state.slice(idx + 1)];
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
      let index = state.findIndex((sal) => sal.id === payload.id);
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
    default:
      return state;
  }
};

export default productsReducer;
