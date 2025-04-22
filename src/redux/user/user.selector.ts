import { RootState } from '../root-state.interface';
import { createSelector } from 'reselect';

const selectUser = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  state => state.currentUser,
)
