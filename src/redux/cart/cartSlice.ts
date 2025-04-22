import {createSlice} from '@reduxjs/toolkit';
import {CartState} from './cart-state.interface';
import {CartItem} from '../../domain/interfaces/CartItem';
import {CartUtil} from './cart.util';

const INITIAL_STATE: CartState = {
  cartItems: [],
  toggleCart: false,
  currentItem: {} as CartItem,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    'addCartItem': (state, action) => {
      state.cartItems = CartUtil.addCartItem(state, action.payload);
    },
    'removeCartItem': (state, action) => {
      state.cartItems = state.cartItems.filter(cartItem => cartItem.product.id !== action.payload);
    },
    'clearItem': (state, action) => {
      state.cartItems = CartUtil.clearCartItem(state, action.payload);
    },
    'clearCart': (state) => {
      state.cartItems = [];
    },
    'toggle': (state) => {
      state.toggleCart = !state.toggleCart;
    }
  },
});

export const {addCartItem, removeCartItem, clearItem, clearCart, toggle} = cartSlice.actions;

export default cartSlice.reducer;
