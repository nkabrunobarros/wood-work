export const DRAWER_TOGGLE = 'DRAWER_TOGGLE';
export const SET_LAST_REFRESHED = 'SET_LAST_REFRESHED';

export const toggleDrawer = () => {
  return {
    type: DRAWER_TOGGLE,
  };
};

export const setLastRefreshed = () => {
  return {
    type: SET_LAST_REFRESHED,
  };
};
