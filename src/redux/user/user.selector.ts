import { RootState } from '../root-state.interface';
import { createSelector } from 'reselect';

const selectUser = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  state => state.currentUser,
)

export const selectKeyCloakUsers = createSelector(
  [selectUser],
  state => state.users,
)

export const selectUserProperties = createSelector(
  [selectUser],
  state => ({
    ...state.user,
    roles: state.user.roles.filter(role => role.name !== "default-roles-portfoliodev"),
    sessions: state.user.sessions}),
)

export const selectUserLoader = createSelector(
  [selectUser],
  state => state.loader,
)
