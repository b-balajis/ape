import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import headers from "../../../../components/APIHeader";

const initialState = {
    studentDashboard: null,
    loading: false,
    error: false,
}

export const getStudentDashboard = createAsyncThunk(
    "studentDashboard",
    async ({sem, dept, sec}) => {
        const response = await fetch(`/${sem}/${dept}/${sec}/studentDashboard`, {
            headers: headers,
        });
        const data = await response.json();
        return data;
    }
);

const studentDashboard = createSlice({
    name: "studentDashboard",
    initialState,
    reducers: {
        studentDashboardAPI: (state, action) => {
            state.studentDashboard = action.payload;
            state.loading = false;
            state.error = false;
        },
    },
    extraReducers: {
        [getStudentDashboard.pending]: (state) => {
            state.loading = true;
        },
        [getStudentDashboard.rejected]: (state) => {
            state.loading = false;
            state.error = true;
        },
        [getStudentDashboard.fulfilled]: (state, action) => {
            if (action.payload) {
                state.loading = false;
                state.studentDashboard = action.payload;
            } else {
                state.loading = false;
                state.error = true;
            }
        },
    },
});

export const { studentDashboardAPI } = studentDashboard.actions;
export default studentDashboard;