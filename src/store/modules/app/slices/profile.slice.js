import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
  loading: false,
  error: false,
};

const profile = createSlice({
  name: "userdata",
  initialState,
  reducers: {
    apiresponse: (state, action) => {
      state.userDetails = action.payload;
      state.loading = false;
      state.error = false;
    },
    profileData: (state, action) => {
      state.userDetails = action.payload;
      state.loading = false;
      state.error = false;
    },
    apierror: (state, action) => {
      state.userDetails = null;
      state.loading = false;
      state.error = true;
    }
  },
});

export const { profileData } = profile.actions;
export default profile;
