import { createReducer } from '@reduxjs/toolkit';
import * as countriesActions from '../../actions/country';

export const initialState = {
  data: null,
};

const countries = createReducer(initialState, (builder) => {
  builder
    .addCase(countriesActions.SET_COUNTRIES, (state, action) => ({
      ...state,
      data: action.data,
    }));
});

export default countries;
