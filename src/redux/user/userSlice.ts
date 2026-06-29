import {UserState} from './user-state.interface';
import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE: UserState = {
  currentUser: null,
  users: [],
  user: {
    profile: null,
    sessions: [],
    roles: [],
  },
  loader: false,
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
      state.user.profile = action.payload ? state.users.find(user => user.id === action.payload.id) : null;
    },
    setUserSessions: (state: UserState, action) => {
      state.user.sessions = action.payload;
    },
    setUserRoles: (state: UserState, action) => {
      state.user.roles = action.payload;
    },
    deleteUser: (state: UserState, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setUserLoader: (state: UserState, action) => {
      state.loader = action.payload;
    }
  },
});

export const {logout, login, setProfiles, setUsers, setUserProfile, deleteUser, setUserSessions, setUserRoles, setUserLoader} = userSlice.actions;

export default userSlice.reducer;
