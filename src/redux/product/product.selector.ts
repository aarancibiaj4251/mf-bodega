import { createSelector } from 'reselect';
import { RootState } from '../root-state.interface';

const selectProducts = (state: RootState) => state.product.products;
const selectCategories = (state: RootState) => state.product.categories;

export const selectAllProducts = createSelector(
  [selectProducts],
  products => products
)


export const selectAllCategories = createSelector(
  [selectCategories],
  categories => categories
)
