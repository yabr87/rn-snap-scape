import { createSlice } from '@reduxjs/toolkit';
import { registerUser, logInUser, logOutUser } from './authOperations';

const initialState = {
  user: { name: '', email: '' },
  uid: '',
  stateChange: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.uid = payload.uid;
        state.stateChange = true;
      })
      .addCase(logInUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.uid = payload.uid;
        state.stateChange = true;
      })
      .addCase(logOutUser.fulfilled, state => {
        Object.assign(state, initialState);
      });
  },
});

export const authReducer = authSlice.reducer;
