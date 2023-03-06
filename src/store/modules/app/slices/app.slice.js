import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    apiresponse: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { apiresponse } = appSlice.actions;
export default appSlice;
