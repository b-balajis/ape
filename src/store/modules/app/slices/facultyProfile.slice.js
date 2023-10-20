import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import headers from "../../../../components/APIHeader";

const initialState = {
    facultyProfile: null,
    loading: false,
    error: false,
};

export const getFaculty = createAsyncThunk(
    "facultyProfile",
    async (email) => {
        const response = await fetch(`/getFaculty/${email}`, {
            headers: headers,
        });
        const data = await response.json();
        localStorage.setItem("facultyId", data.facultyId);
        localStorage.setItem("dept", data.dept);
        return data;
    }
);

const facultyProfile = createSlice({
    name: "facultyProfile",
    initialState,
    reducers: {
        facultyProfileAPI: (state, action) => {
            state.facultyProfile = action.payload;
            state.loading = false;
            state.error = false;
        },
    },
    extraReducers: {
        [getFaculty.pending]: (state) => {
            state.loading = true;
        },
        [getFaculty.rejected]: (state) => {
            state.loading = false;
            state.error = true;
        },
        [getFaculty.fulfilled]: (state, action) => {
            if (action.payload.email) {
                state.loading = false;
                state.facultyProfile = action.payload;
            } else {
                state.loading = false;
                state.error = true;
            }
        },
    },
});

export const { facultyProfileAPI } = facultyProfile.actions;
export default facultyProfile;