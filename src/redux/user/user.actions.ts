import { UserActionTypes } from './user.types';
import { User } from '../../domain/interfaces/user/User';

export const fetchLoginSuccess = (user: User) => ({
  type: UserActionTypes.FETCH_LOGIN_SUCCESS,
  payload: user,
})

export const fetchLoginFailed = (errorMessage: string) => ({
  type: UserActionTypes.FETCH_LOGIN_FAILED,
  payload: errorMessage,
})


export const fetchRegisterSuccess = () => ({
  type: UserActionTypes.FETCH_REGISTER_SUCCESS,
})

export const fetchRegisterFailed = (errorMessage: string) => ({
  type: UserActionTypes.FETCH_LOGIN_FAILED,
  payload: errorMessage,
})

export const logout = () => ({
  type: UserActionTypes.LOGOUT,
})
