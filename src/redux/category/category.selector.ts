import {createSelector} from 'reselect';
import {RootState} from '../root-state.interface';

const selectCategoryState = (state: RootState) => state.category;

export const selectCategories = createSelector(
  [selectCategoryState],
  state => state.categories
)
