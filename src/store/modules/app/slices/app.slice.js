import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
  loading: false,
  error: false,
};

const appSlice = createSlice({
  name: "userdata",
  initialState,
  reducers: {
    apiresponse: (state, action) => {
      state.userDetails = action.payload;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { apiresponse } = appSlice.actions;
export default appSlice;
