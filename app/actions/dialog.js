import { ERROR_FLAG_ON, ERROR_FLAG_OFF } from './types';

const errorFlagOn = error => ({
  type: ERROR_FLAG_ON,
  error,
});

const errorFlagOff = () => ({
  type: ERROR_FLAG_OFF,
});

export const closeErrDialog = () => (dispatch) => {
  dispatch(errorFlagOff());
};

export const openErrDialog = error => (dispatch) => {
  dispatch(errorFlagOn(error));
};
