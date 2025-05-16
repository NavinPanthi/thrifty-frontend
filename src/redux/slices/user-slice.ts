import { createSlice } from "@reduxjs/toolkit";

import {
  getToken,
  getUserData,
  isUserLogin,
  resetLoginData,
  setUserData,
  setUserLogin,
} from "../../utils/auth-storage";

export interface IUser {
  id: number;
  fullName: string;
  email: string;
  address?: string;
  phone?: string;
  imageName?: string;
  imageType?: string;
  imageData?: string;
  roles: string[];
  token: string;
}

export interface IUserState {
  accessToken: string | null;
  user: IUser | null;
  loginStatus: boolean;
}

const initialState: IUserState = {
  accessToken: getToken() || null,
  user: getUserData() || {},
  loginStatus: isUserLogin() || false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      setUserLogin({ ...action.payload });
      state.accessToken = action.payload?.token;
      state.user = action.payload?.userData;
      state.loginStatus = true;
    },

    setUser: (state, action) => {
      setUserData({ ...state.user, ...action.payload });
      state.user = { ...state.user, ...action.payload };
    },

    resetLogin: (state) => {
      resetLoginData();
      state.user = null;
      state.loginStatus = false;
    },
  },
});

export const { setLogin, setUser, resetLogin } = userSlice.actions;
export default userSlice.reducer;
