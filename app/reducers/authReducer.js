import {
  AUTHENTICATING,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
  FB_AUTHENTICATING,
  FB_AUTHENTICATION_SUCCESS,
  FB_AUTHENTICATION_FAILURE,
  UNAUTHENTICATION,
} from '../actions/types';

const initialState = {
  userAuthenticated: false,
  authenticating: false,
  fbUserAuthenticated: false,
  fbUserAuthenticating: false,
  errors: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATING:
      return {
        ...state,
        authenticating: true,
        userAuthenticated: false,
        errors: '',
      };

    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        authenticating: false,
        userAuthenticated: true,
        errors: '',
      };

    case AUTHENTICATION_FAILURE:
      return {
        ...state,
        authenticating: false,
        userAuthenticated: false,
        errors: action.error.message,
      };

    case UNAUTHENTICATION:
      return {
        ...state,
        authenticating: false,
        userAuthenticated: false,
        errors: '',
      };

    case FB_AUTHENTICATING:
      return {
        ...state,
        fbUserAuthenticating: true,
      };

    case FB_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        fbUserAuthenticating: false,
        fbUserAuthenticated: true,
      };

    case FB_AUTHENTICATION_FAILURE:
      return {
        ...state,
        fbUserAuthenticated: false,
        errors: action.error.message,
      };

    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
