import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../../../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

import { UserType } from '../../types/user.type';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../..';
import { firebaseHttpTransport } from '../../../../services/firebase.http';

export const useAppDispatch = () => useDispatch<AppDispatch>();

// Async thunk: login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
    } catch (err) {
      return rejectWithValue((err as any).message);
    }
  }
);

export const addUserAsync = createAsyncThunk(
  'user/adduser',
  async (userData: Partial<UserType>, { rejectWithValue }) => {
    try {
      const recordId = await firebaseHttpTransport.addToCollection('users', userData);

      const userList = await firebaseHttpTransport.getCollectionParsed('users');
      return userList;
    } catch (error) {
      return rejectWithValue((error as any).message);
    }
  }
)

export const getUserListAsync = createAsyncThunk(
  'user/getUserList',
  async (userData: Partial<UserType>, { rejectWithValue }) => {
    try {
      const userList = await firebaseHttpTransport.getCollectionParsed('users');
      return userList;
    } catch (error) {
      return rejectWithValue((error as any).message);
    }
  }
)