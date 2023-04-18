import { combineReducers } from "@reduxjs/toolkit";
import profile from "./modules/app/slices/profile.slice";
import adminDashboard from "./modules/app/slices/adminDashboard.slice";
import RunningSems from "./modules/app/slices/runningSem.slice";

const rootReducer = combineReducers({
  userData: profile.reducer,
  adminDashboard: adminDashboard.reducer,
  RunningSems: RunningSems.reducer,
});

export default rootReducer;
