import appSlice from "./modules/app/slices/app.slice";
import { combineReducers } from "@reduxjs/toolkit";
const rootReducer = combineReducers({ appSlice });
export default rootReducer;
