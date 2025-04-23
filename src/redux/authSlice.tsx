import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface LoggedInUser {
  userId: string;
  email: string;
  userName: string;
}

interface AuthState {
  loggedInUser: LoggedInUser | null;
}

const initialState: AuthState = {
  loggedInUser: JSON.parse(sessionStorage.getItem("loggedInUser") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<LoggedInUser>) => {
      state.loggedInUser = action.payload;
      sessionStorage.setItem("loggedInUser", JSON.stringify(action.payload));
    },
  },
});

export const { loggedIn } = authSlice.actions;
export default authSlice.reducer;
