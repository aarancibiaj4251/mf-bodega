import { createSelector } from 'reselect';
import { RootState } from '../root-state.interface';

export const selectProductState = (state: RootState) => state.product;

export const selectAllProducts = createSelector(
  [selectProductState],
  product => product.products,
)

export const selectMaxAndMinPriceValue = createSelector(
  [selectProductState],
  ({products}) => products
    .reduce((values, product) => {
      return {
        min: Math.min(product.unitPrice, values.min),
        max: Math.max(product.unitPrice, values.max),
      };
    }, {min: 0, max: 0})
)
