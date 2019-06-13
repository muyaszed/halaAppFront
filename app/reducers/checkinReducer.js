import {
  CHECKINGIN_RESTAURANT,
  CHECKIN_RESTAURANT_SUCCESS,
  CHECKIN_RESTAURANT_FAILURE,
} from '../actions/types';

const initialState = {
  isCheckingIn: false,
  CheckedIn: false,
  errors: '',
};

const CheckinReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECKINGIN_RESTAURANT:
      return {
        ...state,
        isCheckingIn: true,
      };
    case CHECKIN_RESTAURANT_SUCCESS:
      return {
        ...state,
        CheckedIn: true,
        isCheckingIn: false,
      };
    case CHECKIN_RESTAURANT_FAILURE:
      return {
        ...state,
        CheckedIn: false,
        error: action.error.message,
      };
    default:
      return state;
  }
};

export default CheckinReducer;
