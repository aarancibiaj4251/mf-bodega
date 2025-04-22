import {all, call, put} from 'redux-saga/effects';
import {getCategories} from '../../data/rest/product.service';
import {setCategories} from './product.actions';

export function* productSagas() {
  yield all([]);
}

export function* fetchCategoriesAsync(): any {
  try {
    const categories = yield call(getCategories);
    yield put(setCategories(categories));
  } catch (error) {
    yield put(setCategories([]));
  }
}
