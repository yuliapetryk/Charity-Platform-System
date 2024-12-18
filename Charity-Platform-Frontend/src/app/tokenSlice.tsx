import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
  value: string;
  isAuthenticated: boolean;
}

const initialState: TokenState = {
  value: '',
  isAuthenticated: false,
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setter: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      state.isAuthenticated = true;
      console.log('Updated state of token to:', state.value);
      localStorage.setItem('authToken', action.payload);
    },
    logout: (state) => {
      state.value = '';
      state.isAuthenticated = false;
      console.log('Logged out');
      localStorage.removeItem('authToken');
    },
    restoreToken: (state) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        state.value = token;
        state.isAuthenticated = true;
        console.log('Restored token from localStorage');
      }
    },
  },
});

export const { setter, logout, restoreToken } = tokenSlice.actions;
export default tokenSlice.reducer;
