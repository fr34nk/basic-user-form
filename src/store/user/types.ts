import { UserType } from "./types/user.type"

export const ADD_USER = '[user] add user'
export const UPDATE_FIELD = '[user] add user'
export const GET_USER = '[user] all user'
export const RESET_USER = '[user] reset user'
export const DELETE_USER = '[user] delete user'
export const GET_USER_BY_ID = '[user] get user by id'
export const SESSION_APPEND_USER = '[user] append user to session'


export interface ADD_USER {
  type: typeof ADD_USER;
  payload: any;
}

export interface RESET_USER {
  type: typeof RESET_USER;
  payload: any;
}

export interface GET_USER {
  type: typeof GET_USER;
}

export interface DELETE_USER {
  type: typeof DELETE_USER;
  payload: any;
}

export interface GET_USER_BY_ID {
  type: typeof GET_USER_BY_ID;
  payload: any;
}

export interface SESSION_APPEND_USER {
  type: typeof SESSION_APPEND_USER;
  payload: Partial<UserType>;
}

export type UserActionTypes = ADD_USER | RESET_USER | GET_USER | DELETE_USER | GET_USER_BY_ID | SESSION_APPEND_USER;
