import { combineReducers } from "@reduxjs/toolkit";
import appSlice from "./modules/app/slices/app.slice";

const rootReducer = combineReducers({
  userData: appSlice.reducer,
});

export default rootReducer;
