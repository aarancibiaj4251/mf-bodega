import {RootState} from "../root-state.interface";
import {createSelector} from "reselect";

const saleSelector = (state: RootState) => state.sale;

export const selectAnnualSaleReport = createSelector(
    [saleSelector],
    state => state.annualReport
)
