import {
  ADD_PRODUCTS,
  SELECT_PROD,
  ADD_SALES_PRODUCT,
  REMOVE_SALES_PRODUCT,
  REMOVE_ALL_SALES_PRODUCTS,
} from "../actions/actionsList";

const initialState = {
  products: [],
  select: { id: "", table: "" },
  salesProducts: [],
};

const productsReducer = (state = initialState, { type, payload }) => {
  console.log("payload", payload);
  switch (type) {
    case ADD_PRODUCTS:
      return { ...state, products: [...state.products, ...payload] };
    default:
      return state;
  }
};

export const selectedProdReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SELECT_PROD:
      return { ...state, select: { ...state.select, ...payload } };
    default:
      return state;
  }
};

export const salesProductsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ADD_SALES_PRODUCT:
      return {
        ...state,
        salesProducts: state.salesProducts.find((sal) =>
          sal.id === payload.id ? sal.cant++ : sal
        )
          ? state.salesProducts
          : [...state.salesProducts, payload],
      };
    case REMOVE_SALES_PRODUCT:
      return [...state, ...payload];
    case REMOVE_ALL_SALES_PRODUCTS:
      return [...state, ...[]];
    default:
      return state;
  }
};

export default productsReducer;
