import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    question: [],
    numberOfQuestion: 1,
    maxQuestion: 10,
  },
  reducers: {
    getQuestionSuccess: (state, action) => {
      state.question = action.payload.results;
      state.maxQuestion = action.payload.totalResults;
    },
    getNumberOfQuestion: (state, action) => {
      state.numberOfQuestion = action.payload;
    },
  },
});

export const { getQuestionSuccess, getNumberOfQuestion } =
  questionSlice.actions;
export default questionSlice.reducer;
