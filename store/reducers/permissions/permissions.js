import { createReducer } from '@reduxjs/toolkit';
import * as permissionsActions from '../../actions/permission';

export const initialState = {
  errors: null,
  loading: false,
  data: null,
  resources: null,
  newestPermission: null,
  newestPermissionError: null,
};

const permissions = createReducer(initialState, (builder) => {
  builder
    //  GET
    .addCase(permissionsActions.PERMISSIONS_SUCCESS, (state, action) => ({
      ...state,
      errors: null,
      loading: false,
      data: action.payload.data.results,
    }))
    .addCase(permissionsActions.PERMISSIONS_FAIL, (state, action) => ({
      ...state,
      errors: state.errors ? [...state.errors, action.payload] : [action.payload],
      loading: false,
    }))
    .addCase(permissionsActions.PERMISSIONS_REQUEST, (state) => ({
      ...state,
      loading: true,
    }))
    //  GET
    .addCase(permissionsActions.RESOURCES_SUCCESS, (state, action) => ({
      ...state,
      errors: null,
      loading: false,
      resources: action.payload.data,
    }))
    .addCase(permissionsActions.RESOURCES_FAIL, (state, action) => ({
      ...state,
      errors: state.errors ? [...state.errors, action.payload] : [action.payload],
      loading: false,
    }))
    .addCase(permissionsActions.RESOURCES_REQUEST, (state) => ({
      ...state,
      loading: true,
    }))
    //  POST
    .addCase(permissionsActions.NEW_PERMISSION_SUCCESS, (state, action) => ({
      ...state,
      errors: null,
      loading: false,
      data: state.data ? state.data.push(action) : state.data,
      newestPermission: action
    }))
    .addCase(permissionsActions.NEW_PERMISSION_FAIL, (state, action) => ({
      ...state,
      newestPermissionError: state.newestPermissionError ? [...state.newestPermissionError, action.payload] : [action.payload],
      loading: false,
    }))
    .addCase(permissionsActions.NEW_PERMISSION_REQUEST, (state) => ({
      ...state,
      loading: true,
    }));
});

export default permissions;
