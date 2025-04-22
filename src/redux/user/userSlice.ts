import {UserState} from './user-state.interface';
import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE: UserState = {
  // @ts-ignore
  currentUser: null,
  profiles: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state: UserState) => {
      // @ts-ignore
      state.currentUser = null;
      state.profiles = [];
      localStorage.clear();
    },
    login: (state: UserState, action) => {
      state.currentUser = action.payload;
    }
  },
});

export const {logout, login} = userSlice.actions;

export default userSlice.reducer;
