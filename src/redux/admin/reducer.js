import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    listQuestion: [],
  },
  reducers: {
    getQuestionAdminSuccess: (state, action) => {
      state.listQuestion = action.payload.results;
    },
    updateQuestionSuccess: (state, action) => {
      state.listQuestion.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
      });
    },
    deleteQuestionSuccess: (state, action) => {
      state.listQuestion.filter((item) => item.id !== action.id);
    },
  },
});

export const {
  getQuestionAdminSuccess,
  updateQuestionSuccess,
  deleteQuestionSuccess,
} = adminSlice.actions;
export default adminSlice.reducer;
