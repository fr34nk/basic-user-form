
import { createSlice } from "@reduxjs/toolkit";
import validate from "../helper/validationForm";
import { user, userList, UserType } from "../types/user.type";

interface State {
  step: number;
  users: Partial<UserType>[];
  data: Partial<UserType>;
  errors: string[]; // or whatever type your errors are
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
});

export const { setStep, nextStep, prevStep, updateField, resetForm, addUser  } =
  formSlice.actions;


export default formSlice.reducer;