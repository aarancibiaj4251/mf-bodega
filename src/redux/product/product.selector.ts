import { createSelector } from 'reselect';
import { RootState } from '../root-state.interface';

const selectProducts = (state: RootState) => state.product.products;
const selectCategories = (state: RootState) => state.product.categories;

export const selectAllProducts = createSelector(
  [selectProducts],
  products => products
)

export const selectMaxAndMinPriceValue = createSelector(
  [selectProducts],
  products => products
    .reduce((values, product) => {
      return {
        min: Math.min(product.unitPrice, values.min),
        max: Math.max(product.unitPrice, values.max),
      };
    }, {min: 0, max: 0})
)

export const selectAllCategories = createSelector(
  [selectCategories],
  categories => categories
)
