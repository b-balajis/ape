import { combineReducers } from "@reduxjs/toolkit";
import adminDashboard from "./modules/app/slices/adminDashboard.slice";
import RunningSems from "./modules/app/slices/runningSem.slice";
import studentDashboard from "./modules/app/slices/studentDashboard.slice";
import studentProfile from "./modules/app/slices/studentProfile.slice";
import subjectQuestions from "./modules/app/slices/subjectQuestions.slice";

const rootReducer = combineReducers({
  studentProfile: studentProfile.reducer,
  // userData: profile.reducer,
  studentDashboard: studentDashboard.reducer,
  subjectQuestions: subjectQuestions.reducer,
  adminDashboard: adminDashboard.reducer,
  RunningSems: RunningSems.reducer,
});

export default rootReducer;
