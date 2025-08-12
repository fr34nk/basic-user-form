import { createStore, combineReducers } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

import userFormSlice from "./user/form/slice";

import {userReducer} from './user/user.reducer';
import { authReducer } from "./auth/reducer";


const FEAT_FLAG_PERSIST = true;

const userPersistConfig = {
  key: 'root', // unique key for the persisted state
  storage, // storage engine to use (e.g., localStorage, sessionStorage)
  whitelist: ['user'], // array of reducer keys to persist (optional)
  // blacklist: ['temporaryData'], // array of reducer keys to NOT persist (optional)
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token'], // only persist these fields
};

const combinedReducers = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    userForm: userFormSlice,
    user: FEAT_FLAG_PERSIST 
      ? persistReducer(userPersistConfig, userReducer) 
      : userReducer
});

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        immutableCheck: {
          warnAfter: 50, // ms
          trace: true,   // log call stack
        }
      },
    }),
  devTools: process.env.NODE_ENV !== 'production', // optional
});


export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch