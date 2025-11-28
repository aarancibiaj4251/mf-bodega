import { ProductActions } from './product.actions';
import { ProductActionTypes } from './product.types';
import { ProductState } from './product-state.interface';

const INITIAL_STATE: ProductState = {
  products: [],
  categories: [],
}

export const productReducer = (state = INITIAL_STATE, action: ProductActions) => {
  switch (action.type) {
    case ProductActionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case ProductActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      }
    default:
      return state;
  }
}
