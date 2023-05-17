import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url } from './helper';
import axios from 'axios';

export const signUp = createAsyncThunk(
  'users/signUp',
  async (formValue, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/signup`, formValue);
      localStorage.setItem('token', response.data.user.token);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('role', response.data.user.role);
      // console.log('signup  token ::', response.data.user.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const logIn = createAsyncThunk(
  'users/logIn',
  async (formValue, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/login`, formValue);
      localStorage.setItem('token', response.data.user.token);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('role', response.data.user.role);
      // console.log('🚀 ~ file: userSlice.js:24 ~ login response:', response);
      // console.log('login  token ::', response.data.user.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  item: [],
  userStatus: null,
  token: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    //signup
    [signUp.pending]: (state, action) => {
      state.userStatus = 'pending';
    },
    [signUp.fulfilled]: (state, action) => {
      state.item = action.payload.user;
      state.token = action.payload.user.token;
      state.userStatus = 'success';
    },
    [signUp.rejected]: (state, action) => {
      state.userStatus = 'rejected';
    },

    //login
    [logIn.pending]: (state, action) => {
      state.userStatus = 'pending';
    },
    [logIn.fulfilled]: (state, action) => {
      state.item = action.payload.user;
      state.token = action.payload.user.token;
      state.userStatus = 'success';
    },
    [logIn.rejected]: (state, action) => {
      state.userStatus = 'rejected';
    },
  },
});

export default userSlice.reducer;
