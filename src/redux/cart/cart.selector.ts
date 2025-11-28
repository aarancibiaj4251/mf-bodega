import { RootState } from '../root-state.interface';
import { createSelector } from 'reselect';
import { CartItem } from '../../domain/interfaces/CartItem';

const cartSelector = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [cartSelector],
  state => state.cartItems
)

export const selectTotalPrice = createSelector(
  [selectCartItems],
  cartItems => {
    return cartItems.reduce((accum: number, {product, count}: CartItem) => {
      return accum + (product.unitPrice * count)
    }, 0);
  }
)

export const selectToggleCart = createSelector(
  [cartSelector],
  state => state.toggleCart
)
