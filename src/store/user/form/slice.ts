
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import validate from "../helper/validationForm";
import { user, userList, UserType } from "../types/user.type";

import { auth } from '../../../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

import { loginUser, addUserAsync }  from './thunks/user.async';



interface State {
  step: number;
  users: Partial<UserType>[];
  data: Partial<UserType>;
  errors: string[]; // or whatever type your errors are
  loading?: boolean;
  error?: any;
}

const initialState: State = {
  step: 0,
  users: [],
  data: {},
  errors: []
};

const formSlice = createSlice({
  name: "userForm",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      if (state.step > 0) state.step -= 1;
      return state;
    },
    updateField: (state, action) => {
      const { field, value } = action.payload;
      (state as any).data[field] = value;
      return state;
    },
    validateForm: (state, action) => {
      const userData = action.payload;
      state.errors = validate(userData);
      return state;
    },
    addUser(state, action) {
      const userData = action.payload;
      state.users.push(userData);
      return state;
    },
    resetForm: (state) => {
      const users = state.users;
      return ({ 
        ...initialState, 
        users
      })
    },
    
  },
  extraReducers: (builder) => {
    builder
       // login
      .addCase(loginUser.pending, (state) => {
      })
      .addCase(loginUser.fulfilled, (state) => {
      })
      .addCase(loginUser.rejected, (state) => {
      })
       // adduser
      .addCase(addUserAsync.pending, (state: State) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserAsync.fulfilled, (state: State, action) => {
        state.users = [...state.users, ...action.payload];
        state.loading = false;
        state.error = null;
      })
      .addCase(addUserAsync.rejected, (state: State) => {
        state.loading = false;
        state.error = true;
      })

  }
});

export const { setStep, nextStep, prevStep, updateField, resetForm, addUser  } =
  formSlice.actions;


export default formSlice.reducer;