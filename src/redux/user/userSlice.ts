import {UserState} from './user-state.interface';
import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE: UserState = {
  // @ts-ignore
  currentUser: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state: UserState) => {
      // @ts-ignore
      state.currentUser = null;
      localStorage.clear();
    },
    login: (state: UserState, action) => {
      state.currentUser = action.payload;
    },
    setProfiles: (state: UserState, action) => {
      state.currentUser = {
        ...state.currentUser,
        profiles: action.payload,
      };
    }
  },
});

export const {logout, login, setProfiles} = userSlice.actions;

export default userSlice.reducer;
