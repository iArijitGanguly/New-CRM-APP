import { createSlice } from '@reduxjs/toolkit';

import { UserState } from '../../types/UserState';

const storedData = localStorage.getItem('data');
const initialState: UserState = {
  role: localStorage.getItem('role') || '',
  data: storedData ? JSON.parse(storedData) : {},
  isLoggedIn: localStorage.getItem('isLoggedIn') == 'true',
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export default AuthSlice.reducer;