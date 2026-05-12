import {createSlice} from '@reduxjs/toolkit';
import {CategoryState} from './category-state.interface';

const initialState: CategoryState = {
  categories: [],
}

export const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
})

export const {setCategories} = categorySlice.actions;

export default categorySlice.reducer;
