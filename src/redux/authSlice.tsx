import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { loggedInUserEmail: null },
  reducers: {
    loggedIn: (state, action: PayloadAction<string>) => {
      state.loggedInUserEmail = action.payload;
      sessionStorage.setItem("loggedInUserEmail", action.payload); //session storage will clear all on tab close
    },
  },
});

export const { loggedIn } = authSlice.actions;
export default authSlice.reducer;
