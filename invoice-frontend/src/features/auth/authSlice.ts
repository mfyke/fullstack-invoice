import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null


const initialState = {
  loading: false,
  userToken: userToken,
  error: null as string | null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: {username: string, password:string}) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
    const { accessToken } = await response.json();
    localStorage.setItem('userToken', accessToken);
    return accessToken;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userToken = null;
      state.error = null;
      localStorage.removeItem('userToken');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userToken = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
