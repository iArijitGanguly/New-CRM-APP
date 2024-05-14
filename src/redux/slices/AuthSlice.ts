import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

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

export const login = createAsyncThunk<AxiosResponse<LoginDetails>, LoginData>('/auth/login', async (data) => {
  try {
    const response = await axiosInstance.post('auth/signin', data);
    return response;
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
      if(action.payload?.status != 201 || !action.payload) return;
      
      state.isLoggedIn = (action.payload?.data?.token != undefined);
      state.data = action.payload?.data?.userData;
      state.token = action.payload?.data?.token;
      state.role = action.payload?.data?.userData?.userType;

      localStorage.setItem('role', action.payload?.data?.userData?.userType || '');
      localStorage.setItem('isLoggedIn', (action.payload?.data?.token != undefined).toString());
      localStorage.setItem('data', JSON.stringify(action.payload?.data?.userData));
      localStorage.setItem('token', action.payload?.data?.token || '');
    });
  }
});

export default AuthSlice.reducer;