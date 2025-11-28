import { combineReducers } from 'redux';
import storage from "redux-persist/lib/storage";
import userReducer from './user/userSlice';
import {productReducer} from './product/product.reducer';
import { persistReducer } from 'redux-persist';
import {loaderReducer} from "./loader/loader.reducer";
import {saleReducer} from "./sale/sale.reducer";
import {lotteryReducer} from './lottery/lottery.reducer';
import cartReducer from './cart/cartSlice';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", 'user', 'lottery']
};

const rootReducer = combineReducers({
  user: userReducer,
  // product: productReducer,
  cart: cartReducer,
  loader: loaderReducer,
  sale: saleReducer,
  lottery: lotteryReducer,
})

export default persistReducer(persistConfig, rootReducer);
