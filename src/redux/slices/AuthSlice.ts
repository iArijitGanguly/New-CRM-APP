import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

import axiosInstance from '../../helpers/axiosInstance';
import { LoginData } from '../../types/LoginData';
import { LoginDetails } from '../../types/LoginDetails';
import { SignupData } from '../../types/SignupData';
import { SignupDetails } from '../../types/SignupDetails';
import { UserState } from '../../types/UserState';

const storedData = localStorage.getItem('data');
const initialState: UserState = {
  role: localStorage.getItem('role') || '',
  data: storedData ? JSON.parse(storedData) : undefined,
  token: localStorage.getItem('token') || '',
  isLoggedIn: localStorage.getItem('isLoggedIn') == 'true',
};

export const login = createAsyncThunk<AxiosResponse<LoginDetails>, LoginData>('/auth/login', async (data) => {
  try {
    const response = axiosInstance.post('auth/signin', data);
    toast.promise(response, {
      loading: 'Submitting form',
      success: 'Successfully signed in',
      error: 'Something went wrong, try again'
    });
    return await response;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const signup = createAsyncThunk<AxiosResponse<SignupDetails>, SignupData>('/auth/signup', async (data) => {
  try {
    const response: AxiosResponse<SignupDetails> = await axiosInstance.post('auth/signup', data);
    toast.promise(Promise.resolve(response), {
      loading: 'Submitting form',
      success: 'Successfully signed up',
      error: 'Something went wrong, try again'
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.role = '';
      state.isLoggedIn = false;
      state.token = '';
      state.data = undefined;
    }
  },
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

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;