import { combineReducers } from 'redux';
import storage from "redux-persist/lib/storage";
import userReducer from './user/userSlice';
import { persistReducer } from 'redux-persist';
import {loaderReducer} from "./loader/loader.reducer";
import {saleReducer} from "./sale/sale.reducer";
import {lotteryReducer} from './lottery/lottery.reducer';
import cartReducer from './cart/cartSlice';
import productReducer from './product/productSlice';
import categoryReducer from './category/categorySlice';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", 'user', 'lottery']
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  loader: loaderReducer,
  sale: saleReducer,
  lottery: lotteryReducer,
  category: categoryReducer
})

export default persistReducer(persistConfig, rootReducer);
