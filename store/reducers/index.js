import { combineReducers } from 'redux';

import { LOGOUT } from '../actions/logout';
import appStates from './appStates';
import auth from './auth';
import budgets from './budgets';
import clients from './clients';
import emails from './emails';
import expeditions from './expeditions';
import folders from './folders';
import organizations from './organizations';
import parts from './parts';
import permissions from './permissions';
import projects from './projects';
import workers from './workers';

const appReducer = combineReducers({
  auth,
  workers,
  budgets,
  clients,
  projects,
  appStates,
  expeditions,
  organizations,
  permissions,
  parts,
  emails,
  folders,
});

const rootReducer = (state, action) => {
  let updatedState = state;

  // Reset store when logging out
  if (action.type === LOGOUT) {
    updatedState = undefined;
  }

  return appReducer(updatedState, action);
};

export default rootReducer;
