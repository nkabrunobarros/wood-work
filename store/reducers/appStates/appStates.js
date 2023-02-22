import { createReducer } from '@reduxjs/toolkit';
import moment from 'moment';
import * as appStatesActions from '../../actions/appState';

export const initialState = {
  drawerOpen: false,
  lastRefreshed: false,
  loading: false,
};

const appStates = createReducer(initialState, (builder) => {
  builder
    .addCase(appStatesActions.DRAWER_TOGGLE, (state) => ({
      ...state,
      drawerOpen: !state.drawerOpen,
    }))
    .addCase(appStatesActions.SET_LAST_REFRESHED, (state) => ({
      ...state,
      lastRefreshed: moment().format(),
    }));
});

export default appStates;
