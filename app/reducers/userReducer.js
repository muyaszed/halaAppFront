import {
  GETTING_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATING_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from '../actions/types';

const initialState = {
  data: {},
  gettingUser: false,
  getData: false,
  updatingUser: false,
  userUpdated: false,
  errors: '',
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_USER:
      return {
        ...state,
        gettingUser: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        getData: true,
        gettingUser: false,
        data: action.user,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        errors: action.error.message,
      };
    case UPDATING_USER:
      return {
        ...state,
        updatingUser: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updatingUser: false,
        userUpdated: true,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        userUpdated: false,
        updatingUser: false,
        errors: action.error.message,
      };
    default:
      return {
        ...state,
      };
  }
};

export default UserReducer;
