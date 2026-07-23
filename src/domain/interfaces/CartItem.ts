import { Product } from './Product';

export interface CartItem {
  /** The product in the shop cart */
  product: Product;
  /** The quantity of the product */
  count: number;
}

export interface Cart {
  clearCart: () => void;
  addCartItem: (cartItem: CartItem) => void;
  removeCartItem: (id: string) => void;
}
