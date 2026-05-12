import {createSlice} from '@reduxjs/toolkit';
import {ProductState} from './product-state.interface';

const INITIAL_STATE: ProductState = {
  products: [],
  page: 0,
  isLastPage: false,
  isFiltering: false,
  isLoading: false,
}

export const productSlice = createSlice({
  name: 'product',
  initialState: INITIAL_STATE,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProducts: (state, {payload}) => {
      state.products = [...state.products, ...payload.products];
      state.isLastPage = payload.isLastPage;
    },
    setIsFiltering: (state, {payload}) => {
      state.isFiltering = payload;
    }
  }
});

export const {setProducts, setIsFiltering, setIsLoading} = productSlice.actions;

export default productSlice.reducer;
