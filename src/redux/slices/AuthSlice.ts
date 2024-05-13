import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../helpers/axiosInstance';
import { LoginData } from '../../types/LoginData';
import { LoginDetails } from '../../types/LoginDetails';
import { UserState } from '../../types/UserState';

const storedData = localStorage.getItem('data');
const initialState: UserState = {
  role: localStorage.getItem('role') || '',
  data: storedData ? JSON.parse(storedData) : {},
  token: localStorage.getItem('token') || '',
  isLoggedIn: localStorage.getItem('isLoggedIn') == 'true',
};

export const login = createAsyncThunk<LoginDetails, LoginData>('/auth/login', async (data) => {
  try {
    const response = await axiosInstance.post('auth/signin', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = (action.payload.token != undefined);
      state.data = action.payload?.userData;
      state.token = action.payload?.token;
      state.role = action.payload?.userData?.userType;

      localStorage.setItem('role', action.payload?.userData?.userType || '');
      localStorage.setItem('isLoggedIn', (action.payload?.token != undefined).toString());
      localStorage.setItem('data', JSON.stringify(action.payload?.userData));
      localStorage.setItem('token', action.payload?.token || '');
    });
  }
});

export default AuthSlice.reducer;