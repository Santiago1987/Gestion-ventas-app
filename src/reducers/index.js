import { combineReducers } from "redux";
import productsReducer, {
  selectedProdReducer,
  salesProductsReducer,
} from "./Products";
import searchReducer from "./Search";
import dolarReducer from "./Dolar";

const rootReducers = combineReducers({
  Products: productsReducer,
  Search: searchReducer,
  selectedProd: selectedProdReducer,
  salesProducts: salesProductsReducer,
  dolar: dolarReducer,
});

export default rootReducers;
