import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginBase } from '../../services/apiList';


// פעולה אסינכרונית לטיפול בתהליך ההתחברות
export const loginThunk = createAsyncThunk('auth/loginThunk', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(loginBase, credentials);
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response.data);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    access: null,
    refresh: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      console.log('User logged out');
      state.user = null;
      state.access = null;
      state.refresh = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        console.log('Login pending...');
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        console.log('Login fulfilled:', action.payload);
        state.isLoading = false;
        state.user = action.payload.user;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        sessionStorage.setItem('accessToken', action.payload.access);
        sessionStorage.setItem('refreshToken', action.payload.refresh);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        console.error('Login rejected:', action.payload);
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
