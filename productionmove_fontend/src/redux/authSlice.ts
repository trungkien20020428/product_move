import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types';
import { getListUser } from '../services/users';

type authState = {
  currentUser: User;
  accessToken: string;
  isLogin: boolean;
  listUser: [];
};

const INITIALSTATE: authState = {
  currentUser: {
    id: 0,
    email: '',
    displayName: '',
    phone: '',
    photoURL: '',
    roleId: 0,
  },
  accessToken: '',
  isLogin: false,
  listUser: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIALSTATE,
  reducers: {
    login(state, action) {
      const { currentUser, accessToken } = action.payload;
      localStorage.setItem('access_token', accessToken);
      return {
        ...state,
        currentUser,
        accessToken,
        isLogin: true,
      };
    },
    requestListUser(state, action) {
      const { listUser } = action.payload;
      return {
        ...state,
        listUser,
      };
    },
    logOut: (state, action) => {
      localStorage.removeItem('access_token');
      return {
        ...state,
        currentUser: {
          id: 0,
          email: '',
          displayName: '',
          phone: '',
          photoURL: '',
          roleId: 0,
        },
        accessToken: '',
        isLogin: false,
      };
    },
  },
});

export const { login, logOut, requestListUser } = authSlice.actions;

export default authSlice.reducer;

export const currentUserSelector = (state: any) => state.auth.currentUser;

export const tokenSelector = (state: any) => {
  return state.auth.accessToken;
};
