import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    error: false
  };

  const appslice = createSlice({
    name: "app",
    initialState,
    reducers: {
        apiresponse: (state, action) => {
            console.log(action.payload);
            state.data = action.payload;
        }
    },
  });

export const {apiresponse} = appslice.actions;
export default appslice.reducer;
