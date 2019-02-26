import { GETTING_USER, GET_USER_SUCCESS, GET_USER_FAILURE } from '../actions/types';

const initialState = {
  data: {},
  gettingUser: false,
  getData: false,
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
    default:
      return {
        ...state,
      };
  }
};

export default UserReducer;
