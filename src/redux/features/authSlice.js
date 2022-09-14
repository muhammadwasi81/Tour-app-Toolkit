import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../api';

// LOGIN USER API
export const login = createAsyncThunk(
  `/auth/login`,
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/users/signin`, formValue);
      console.log(response.data, 'login');
      toast.success(`Login Successfully`);
      return response.data;
    } catch (error) {
      console.error('13', error);
      return rejectWithValue(error.response.data);
    }
  }
);

// REGISTER USER API
export const register = createAsyncThunk(
  `/auth/register`,
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/users/signup`, formValue);
      console.log(response.data, 'register');
      toast.success(`User Register Successfully`);
      return response.data;
    } catch (error) {
      console.error('user register error', error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  error: '',
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
