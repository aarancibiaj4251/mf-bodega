import {SaleState} from "./sale-state.interface";
import {SaleActionTypes} from "./sale.types";

const INITIAL_STATE: SaleState = {
  // @ts-ignore
  annualReport: null,
}

export const saleReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SaleActionTypes.FETCH_REPORT_SUCCESS:
      return {
        ...state,
        annualReport: action.payload,
      }
    default:
      return state;
  }
}
