import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const Store = () => {
  const store = configureStore({
    reducer: (state, action) => {
      return rootReducer(state, action);
    },
    devTools: true
  });
  return store;
};

export default Store;