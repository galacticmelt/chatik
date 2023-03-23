import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userCookie: Cookies.get('chatToken'),
    user: {},
    isLoading: false,
    error: false
  },
  reducers: {
    login(state, action) {},
    logout(state, action) {}
  }
});
