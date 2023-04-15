import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    const { name, email, password } = userData;

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!response.user.displayName) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      const userData = {
        user: {
          name: response.user.displayName,
          email: response.user.email,
        },
        uid: response.user.uid,
      };

      return userData;
    } catch (error) {
      console.log('register error', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const logInUser = createAsyncThunk(
  'auth/logInUser',
  async (userData, { rejectWithValue }) => {
    const { email, password } = userData;

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      const userData = {
        user: {
          name: response.user.displayName,
          email: response.user.email,
        },
        uid: response.user.uid,
      };

      return userData;
    } catch (error) {
      console.log('login error', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logOutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log('logout error ', error.message);
      return rejectWithValue(error.message);
    }
  }
);
