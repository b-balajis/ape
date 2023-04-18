import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import headers from "../../../../components/APIHeader";

const initialState = {
  runningSems: null,
  loading: false,
  error: false,
};

export const fetchRunningSems = createAsyncThunk("runningSems", async () => {
  const response = await fetch(`/runningSems`, {
    headers: headers,
  });
  const data = await response.json();
  return data[0];
});

const runningSem = createSlice({
  name: "runningSems",
  initialState,
  reducers: {
    apiresponse: (state, action) => {
      state.runningSems = action.payload;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: {
    [fetchRunningSems.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchRunningSems.fulfilled]: (state, action) => {
      state.loading = false;
      state.runningSems = action.payload;
    },
    [fetchRunningSems.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { runningSems } = runningSem.actions;
export default runningSem;
