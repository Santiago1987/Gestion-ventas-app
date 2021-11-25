import { combineReducers } from "redux";
import productsReducer, {
  selectedProdReducer,
  salesProductsReducer,
} from "./Products";
import searchReducer from "./Search";
import settingsReducer from "./Settings";

const rootReducers = combineReducers({
  Products: productsReducer,
  Search: searchReducer,
  selectedProd: selectedProdReducer,
  salesProducts: salesProductsReducer,
  settings: settingsReducer,
});

export default rootReducers;
