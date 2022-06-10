import { createSlice } from "@reduxjs/toolkit";

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    answer: [],
  },
  reducers: {
    submitQuestionSuccess: (state, action) => {
      state.answer = [...state.answer, action.payload];
    },
  },
});

export const { submitQuestionSuccess } = answerSlice.actions;
export default answerSlice.reducer;
