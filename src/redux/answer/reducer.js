import { createSlice } from "@reduxjs/toolkit";

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    answer: [],
  },
  reducers: {
    saveQuestionSuccess: (state, action) => {
      state.answer = [...state.answer, action.payload];
    },
  },
});

export const { saveQuestionSuccess } = answerSlice.actions;
export default answerSlice.reducer;
