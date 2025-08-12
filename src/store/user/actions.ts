
import {
  ADD_USER,
  RESET_USER,
  GET_USER,
  DELETE_USER,
  GET_USER_BY_ID,
  SESSION_APPEND_USER
} from './types';
import { UserType } from './types/user.type';

export const addUserAction = (data: any) => ({
  type: ADD_USER,
  payload: data
});

export const resetUserAction = () => ({
  type: RESET_USER,
});

export const getUserAction = () => ({
  type: GET_USER,
  // payload: data
});

export const deleteUserAction = (data: any) => ({
  type: DELETE_USER,
  payload: data
});

export const getUserByIdAction = (data: any) => ({
  type: GET_USER_BY_ID,
  payload: data
});

export const appendUserToSessionAction = (data: Partial<UserType>) => ({
  type: SESSION_APPEND_USER,
  payload: data as UserType
});



