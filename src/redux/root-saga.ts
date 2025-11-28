import { all, call } from "redux-saga/effects";
import { productSagas } from "./product/product.sagas";
import { userSagas } from './user/user.sagas';
import {saleSagas} from "./sale/sale.sagas";

export default function* rootSaga() {
  yield all([call(productSagas), call(userSagas), call(saleSagas)]);
}
