import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getUserInfo = () => {
  try {
    const userInfo = Cookies.get("userInfo");

    if (userInfo) {
      const parsed = JSON.parse(userInfo);

      return {
        accessToken: parsed.accessToken,
        user: parsed.user,
      };
    }
  } catch (err) {
    console.log(err);
  }

  return {
    accessToken: undefined,
    user: undefined,
  };
};

const initialState = getUserInfo();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      Cookies.remove('userInfo');
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
