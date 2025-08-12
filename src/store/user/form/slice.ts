
import { createSlice } from "@reduxjs/toolkit";
import validate from "../helper/validationForm";
import { user, userList } from "../types/user.type";

/* Initial State */
const initialState = {
  step: 0,
  users: [],
  data: user,
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
    },
    addUser: (state, action) => {
      const userData = action.payload;
      // @ts-ignore
      state.users = [...state.users, user ]
    },

    resetForm: () => initialState,
  },
});

export const { setStep, nextStep, prevStep, updateField, resetForm } =
  formSlice.actions;


export default formSlice.reducer;