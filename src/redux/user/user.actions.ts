import { UserActionTypes } from './user.types';
import { User, UserRegister } from '../../domain/interfaces/user/User';

export const fetchLoginStart = ({username, password}: {username: string, password: string}) => ({
  type: UserActionTypes.FETCH_LOGIN_START,
  payload: {username, password},
})

export const fetchLoginSuccess = (user: User) => ({
  type: UserActionTypes.FETCH_LOGIN_SUCCESS,
  payload: user,
})

export const fetchLoginFailed = (errorMessage: string) => ({
  type: UserActionTypes.FETCH_LOGIN_FAILED,
  payload: errorMessage,
})

export const fetchRegisterStart = (user: UserRegister) => ({
  type: UserActionTypes.FETCH_REGISTER_START,
  payload: user,
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
