import {SaleActionTypes} from "./sale.types";

export const fetchSaleReportStart = () => ({
  type: SaleActionTypes.FETCH_REPORT_START
})

export const fetchSaleReportSuccess = (data: any) => ({
  type: SaleActionTypes.FETCH_REPORT_SUCCESS,
  payload: data
})

export const fetchSaleReportFailed = (error: string) => ({
  type: SaleActionTypes.FETCH_REPORT_FAILED,
  payload: error
})
