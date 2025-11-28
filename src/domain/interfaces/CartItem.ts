import { Product } from './Product';

export interface CartItem {
  product: Product;
  count: number;
}

export interface Cart {
  clearCart: () => void;
  addCartItem: (cartItem: CartItem) => void;
  removeCartItem: (id: string) => void;
}
