import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import headers from "../../../../components/APIHeader";

const initialState = {
  adminDashboard: null,
  loading: false,
  error: false,
};

export const fetchAdminDashboard = createAsyncThunk(
  "adminDashboard",
  async () => {
    const response = await fetch(`/BSH/fetchSemWiseData`, {
      headers: headers,
    });
    const data = await response.json();
    console.log(data, "thunk");
    return data;
  }
);

const adminDashboard = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    apiresponse: (state, action) => {
      state.adminDashboard = action.payload;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: {
    [fetchAdminDashboard.pending]: (state) => {
      state.loading = true;
    },
    [fetchAdminDashboard.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [fetchAdminDashboard.fulfilled]: (state, action) => {
      state.loading = false;
      state.adminDashboard = action.payload;
    },
  },
});

export const { adminsDashboard } = adminDashboard.actions;
export default adminDashboard;
