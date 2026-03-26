import {createSlice} from '@reduxjs/toolkit';
import {AuthState} from './auth-state.interface';

const INITIAL_STATE: AuthState = {
  keycloak: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    saveSession: (state: AuthState, action) => {
      state.keycloak = action.payload;
    },
    keyCloakLogout: (state: AuthState) => {
      localStorage.clear();
      state.keycloak.logout();
    },
    keyCloakLogin: (state: AuthState, action) => {
      state.keycloak.login({redirectUri: action.payload.redirectUri});
    },

  },
});

export const {saveSession, keyCloakLogout, keyCloakLogin} = authSlice.actions;

export default authSlice.reducer;
