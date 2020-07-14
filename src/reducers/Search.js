import { ADD_SEARCH } from "../actions/actionsList";

const Search = "";

const searchReducer = (state = Search, { type, payload }) => {
  switch (type) {
    case ADD_SEARCH:
      return state, payload;
    default:
      return state;
  }
};

export default searchReducer;
