import { SET_DOLAR } from "../actions/actionsList";

const initialDolar = { value: 0 };

const dolarReducer = (state = initialDolar, { type, payload }) => {
  switch (type) {
    case SET_DOLAR:
      return { ...state, value: payload };
    default:
      return state;
  }
};

export default dolarReducer;
