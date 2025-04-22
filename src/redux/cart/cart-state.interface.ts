import { CartItem } from '../../domain/interfaces/CartItem';

export interface CartState {
  cartItems: Array<CartItem>;
  toggleCart: boolean;
  currentItem: CartItem;
}
