import { ERROR_FLAG_ON, ERROR_FLAG_OFF } from '../actions/types';

const initialState = {
  errorFlag: false,
  error: '',
};

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_FLAG_ON:
      console.log('inside error flag on reducer');
      return {
        ...state,
        errorFlag: true,
        error: action.error.message,
      };

    case ERROR_FLAG_OFF:
      console.log('inside error flag off reducer');
      return {
        ...state,
        errorFlag: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default dialogReducer;
