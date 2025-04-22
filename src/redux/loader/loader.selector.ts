import {createSelector} from "reselect";
import {RootState} from "../root-state.interface";

const loaderSelector = (state: RootState) => state.loader;

export const selectLoader = createSelector(
    [loaderSelector],
    state => state.loader
)
