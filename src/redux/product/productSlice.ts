import {createSlice} from '@reduxjs/toolkit';
import {ProductState} from './product-state.interface';

const INITIAL_STATE: ProductState = {
  products: [],
  categories: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState: INITIAL_STATE,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  }
});

export const {setProducts} = productSlice.actions;

export default productSlice.reducer;
