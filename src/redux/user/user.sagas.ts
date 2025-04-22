import { all, call, takeLatest, put } from 'redux-saga/effects';
import { UserActionTypes } from './user.types';
import { fetchLoginFailed, fetchLoginSuccess, fetchRegisterFailed, fetchRegisterSuccess } from './user.actions';
import { login, register } from '../../data/rest/auth/auth.service';
import { userInformation } from '../../data/rest/user.service';

export function* fetchLoginAsync(action: any): any {
  try {
    yield call(login, action.payload.username, action.payload.password);
    const information = yield call(userInformation, action.payload.username);
    yield put(fetchLoginSuccess(information));
  } catch (error) {
    yield put(fetchLoginFailed('Error al inciar sesión'));
  }
}

export function* fetchLoginStart() {
  yield takeLatest(
    UserActionTypes.FETCH_LOGIN_START,
    fetchLoginAsync
  );
}

export function* fetchRegisterAsync({payload}: any) {
  try {
    yield call(register, payload);
    yield put(fetchRegisterSuccess());
  } catch (e) {
    yield put(fetchRegisterFailed('Error al registrarse'));
  }
}

export function* fetchRegisterStart() {
  yield takeLatest(
    UserActionTypes.FETCH_REGISTER_START,
    fetchRegisterAsync
  );
}

export function* userSagas() {
  yield all([call(fetchLoginStart), call(fetchRegisterStart)]);
}
