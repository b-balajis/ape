import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import headers from "../../../../components/APIHeader";

const initialState = {
    studentProfile: null,
    loading: false,
    error: false,
};

export const getStudent = createAsyncThunk(
    "studentProfile",
    async (email) => {
        const response = await fetch(`/getStudent/${email}`, {
            headers: headers,
        });
        const data = await response.json();
        localStorage.setItem("sem", data.presentSem);
        localStorage.setItem("dept", data.dept);
        localStorage.setItem("section", data.sec);
        localStorage.setItem("jntu", data.jntu);
        return data;
    }
);

const studentProfile = createSlice({
    name: "studentProfile",
    initialState,
    reducers: {
        studentProfileAPI: (state, action) => {
            state.studentProfile = action.payload;
            state.loading = false;
            state.error = false;
        },
    },
    extraReducers: {
        [getStudent.pending]: (state) => {
            state.loading = true;
        },
        [getStudent.rejected]: (state) => {
            state.loading = false;
            state.error = true;
        },
        [getStudent.fulfilled]: (state, action) => {
            if (action.payload.email) {
                state.loading = false;
                state.studentProfile = action.payload;
            } else {
                state.loading = false;
                state.error = true;
            }
        },
    },
});

export const { studentProfileAPI } = studentProfile.actions;
export default studentProfile;