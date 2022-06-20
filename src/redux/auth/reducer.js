import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.auth = action.payload;
    },
    getScoreSuccess: (state, action) => {
      const sum = action.payload.filter((item) => item.result === true);
      state.auth.user.score = sum.length;
    },
    logoutSuccess: (state) => {
      state.auth = null;
    },
    refreshSuccess: (state, action) => {
      state.auth.tokens = action.payload;
    },
  },
});

export const { loginSuccess, getScoreSuccess, logoutSuccess, refreshSuccess } =
  authSlice.actions;
export default authSlice.reducer;
