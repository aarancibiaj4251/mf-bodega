import { RootState } from '../root-state.interface';
import { createSelector } from 'reselect';

const selectUserState = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserState],
  state => state.authUser,
)

export const selectKeyCloakUsers = createSelector(
  [selectUserState],
  state => state.users,
)

export const selectSelectedUser = createSelector(
  [selectUserState],
  state => state.selectedUser
)

export const selectUserLoader = createSelector(
  [selectUserState],
  state => state.loader,
)
