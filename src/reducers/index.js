import { combineReducers } from "redux";
import productsReducer, {
  selectedProdReducer,
  salesProductsReducer,
} from "./Products";
import searchReducer from "./Search";

const rootReducers = combineReducers({
  Products: productsReducer,
  Search: searchReducer,
  selectedProd: selectedProdReducer,
  salesProducts: salesProductsReducer,
});

export default rootReducers;
