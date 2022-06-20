import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    listQuestion: [],
    listUser: [],
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
    getUsersSuccess: (state, action) => {
      state.listUser = action.payload.results;
    },
    updateUserSuccess: (state, action) => {
      state.listUser.results.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
      });
    },
  },
});

export const {
  getQuestionAdminSuccess,
  updateQuestionSuccess,
  deleteQuestionSuccess,
  getUsersSuccess,
  updateUserSuccess,
} = adminSlice.actions;
export default adminSlice.reducer;
