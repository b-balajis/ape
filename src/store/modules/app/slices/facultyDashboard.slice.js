import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import headers from "../../../../components/APIHeader";

const initialState = {
  facultyDashboard: null,
  loading: false,
  error: false,
};

export const getFacultyDashboard = createAsyncThunk(
  "facultyDashboard",
  async ({ facultyId, dept }) => {
    const response = await fetch(`/${facultyId}/${dept}/facultydashboard`, {
      headers: headers,
    });
    const data = await response.json();
    return data;
  }
);

const facultyDashboard = createSlice({
  name: "facultyDashboard",
  initialState,
  reducers: {
    facultyDashboardAPI: (state, action) => {
      state.facultyDashboard = action.payload;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: {
    [getFacultyDashboard.pending]: (state) => {
      state.loading = true;
    },
    [getFacultyDashboard.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [getFacultyDashboard.fulfilled]: (state, action) => {
      if (action.payload) {
        state.loading = false;
        state.facultyDashboard = action.payload;
      } else {
        state.loading = false;
        state.error = true;
      }
    },
  },
});

export const { facultyDashboardAPI } = facultyDashboard.actions;
export default facultyDashboard;
