import { ERROR_FLAG_ON, ERROR_FLAG_OFF } from './types';

const errorFlagOn = () => ({
  type: ERROR_FLAG_ON,
});

const errorFlagOff = () => ({
  type: ERROR_FLAG_OFF,
});

export const closeErrDialog = () => (dispatch) => {
  dispatch(errorFlagOff());
};

export const openErrDialog = () => (dispatch) => {
  dispatch(errorFlagOn());
};
