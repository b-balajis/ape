import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import headers from "../../../../components/APIHeader";

const initialState = {
  subjectQuestions: null,
  loading: false,
  error: false,
};

export const getSubjectQuestions = createAsyncThunk(
  "subjectQuestions",
  async ({ sem, courseCode }) => {
    const response = await fetch(
      `/${sem}/${courseCode.toUpperCase()}/fetchQuestions`,
      {
        headers: headers,
      }
    );
    const data = await response.json();
    return data;
  }
);

const subjectQuestions = createSlice({
  name: "subjectQuestions",
  initialState,
  reducers: {
    subjectQuestionsAPI: (state, action) => {
      state.subjectQuestions = action.payload;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: {
    [getSubjectQuestions.pending]: (state) => {
      state.loading = true;
    },
    [getSubjectQuestions.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [getSubjectQuestions.fulfilled]: (state, action) => {
      if (action.payload) {
        state.loading = false;
        state.subjectQuestions = action.payload;
      } else {
        state.loading = false;
        state.error = true;
      }
    },
  },
});

export const { subjectQuestionsAPI } = subjectQuestions.actions;
export default subjectQuestions;
