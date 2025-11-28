import {LoaderActionTypes} from "./loader.types";

export const showLoader = () => ({
    type: LoaderActionTypes.SHOW_LOADER,
})

export const hideLoader = () => ({
    type: LoaderActionTypes.HIDE_LOADER,
})
