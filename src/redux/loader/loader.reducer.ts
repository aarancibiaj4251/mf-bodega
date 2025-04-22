import {LoaderState} from "./loader-state.interface";
import {LoaderActionTypes} from "./loader.types";

const INITIAL_STATE: LoaderState = {
    loader: false,
};

export const loaderReducer = (state = INITIAL_STATE, action: {type: string}) => {
    switch (action.type) {
        case LoaderActionTypes.SHOW_LOADER: {
            return {
                ...state,
                loader: true,
            }
        }
        case LoaderActionTypes.HIDE_LOADER: {
            return {
                ...state,
                loader: false,
            }
        }
        default:
            return state;
    }
}
