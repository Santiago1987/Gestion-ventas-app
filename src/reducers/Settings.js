import { SET_SETTINGS } from "../actions/actionsList";

const initialSettings = { dolar: 0, porcLocal: 0, porcML: 0 };

const settingsReducer = (state = initialSettings, { type, payload }) => {
  switch (type) {
    case SET_SETTINGS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default settingsReducer;
