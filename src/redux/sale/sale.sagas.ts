import {all, call, put, takeLatest} from "redux-saga/effects";
import {SaleActionTypes} from "./sale.types";
import {fetchSaleReportFailed, fetchSaleReportSuccess} from "./sale.actions";
import {saleReportAnnual} from "../../data/rest/sale.service";

export function* fetchSaleAsync(): any {
  try {
    const report = yield call(saleReportAnnual);
    yield put(fetchSaleReportSuccess(report));
  } catch (e) {
    yield put(fetchSaleReportFailed('Error al consumir reporte de venta'));
  }
}

export function* fetchLoginStart() {
  yield takeLatest(
      SaleActionTypes.FETCH_REPORT_START,
      fetchSaleAsync
  );
}

export function* saleSagas() {
  yield all([call(fetchLoginStart)]);
}
