import {UserState} from './user-state.interface';
import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE: UserState = {
  currentUser: null,
  users: [],
  userProfile: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state: UserState) => {
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
    },
    setUsers: (state: UserState, action) => {
      state.users = action.payload;
    },
    setUserProfile: (state: UserState, action) => {
      state.userProfile = action.payload ? state.users.find(user => user.id === action.payload.id) : null;
    },
  },
});

export const {logout, login, setProfiles, setUsers, setUserProfile} = userSlice.actions;

export default userSlice.reducer;
