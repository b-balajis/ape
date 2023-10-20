import { combineReducers } from "@reduxjs/toolkit";
import adminDashboard from "./modules/app/slices/adminDashboard.slice";
import facultyDashboard from "./modules/app/slices/facultyDashboard.slice";
import facultyProfile from "./modules/app/slices/facultyProfile.slice";
import RunningSems from "./modules/app/slices/runningSem.slice";
import studentDashboard from "./modules/app/slices/studentDashboard.slice";
import studentProfile from "./modules/app/slices/studentProfile.slice";
import subjectQuestions from "./modules/app/slices/subjectQuestions.slice";

const rootReducer = combineReducers({
  studentProfile: studentProfile.reducer,
  facultyProfile: facultyProfile.reducer,
  // userData: profile.reducer,
  studentDashboard: studentDashboard.reducer,
  facultyDashboard: facultyDashboard.reducer,
  subjectQuestions: subjectQuestions.reducer,
  adminDashboard: adminDashboard.reducer,
  RunningSems: RunningSems.reducer,
});

export default rootReducer;
