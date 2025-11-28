import { CartState } from './cart-state.interface';
import { CartItem } from '../../domain/interfaces/CartItem';

export class CartUtil {
  public static addCartItem(state: CartState, cartItem: CartItem) {
    const cartItemIndex = state.cartItems.findIndex(cartItemState => cartItemState.product.id === cartItem.product.id);
    const newCartItem: CartItem = {product: cartItem.product, count: cartItem.count + 1};
    if (cartItemIndex !== -1) {
      state.cartItems.splice(cartItemIndex, 1, newCartItem);
    } else {
      state.cartItems.push(newCartItem);
    }
    return [...state.cartItems];
  }

  public static clearCartItem(state: CartState, {product}: CartItem) {
    const currentCartItem = state.cartItems.find(x => x.product.id === product.id);
    if (currentCartItem && currentCartItem.count === 1) {
      return state.cartItems.filter(x => x.product.id !== currentCartItem.product.id);
    }
    return state.cartItems.map(cartItem => cartItem.product.id === product.id ? { count: cartItem.count - 1, product: cartItem.product } : cartItem)
  }
}
