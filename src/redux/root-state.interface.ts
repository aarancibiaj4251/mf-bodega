import { CartState } from './cart/cart-state.interface';
import { ProductState } from './product/product-state.interface';
import { UserState } from './user/user-state.interface';
import {LoaderState} from "./loader/loader-state.interface";
import {SaleState} from "./sale/sale-state.interface";
import {LotteryState} from './lottery/lottery-state.interface';

export interface RootState {
  user: UserState,
  product: ProductState,
  cart: CartState,
  loader: LoaderState,
  sale: SaleState,
  lottery: LotteryState
}
