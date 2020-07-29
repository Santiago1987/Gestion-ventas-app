import {
  ADD_PRODUCTS,
  SELECT_PROD,
  ADD_SALES_PRODUCT,
  REMOVE_SALES_PRODUCT,
  REMOVE_ALL_SALES_PRODUCTS,
} from "../actions/actionsList";

const Products = [];
const select = { id: "", table: "" };
const salesProducts = [];

const productsReducer = (state = Products, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCTS:
      return [...state, ...payload];
    default:
      return state;
  }
};

export const selectedProdReducer = (state = select, { type, payload }) => {
  switch (type) {
    case SELECT_PROD:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const salesProductsReducer = (
  state = salesProducts,
  { type, payload }
) => {
  switch (type) {
    case ADD_SALES_PRODUCT:
      return [...state, ...addSalesProd(payload, state)];
    case REMOVE_SALES_PRODUCT:
      return [...state, ...payload];
    case REMOVE_ALL_SALES_PRODUCTS:
      return [...state, ...[]];
    default:
      return state;
  }
};

export default productsReducer;

function addSalesProd(prod, list) {
  let sal = list.find((s) => s.id === prod.id);

  if (sal === undefined) {
    prod.cant = 1;
    console.log("[...list, prod]", [...list, prod]);
    return [...list, prod];
  }
  console.log("sal", sal);
  sal.cant++;
  return [...list, sal];
}
