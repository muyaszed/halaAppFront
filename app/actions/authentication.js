import { AsyncStorage } from 'react-native';
import {
  AUTHENTICATING,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
  UNAUTHENTICATION,
} from './types';

import Api from '../api';
import NavigationService from '../../NavigationService';
import { openErrDialog } from './dialog';

const authenticatingUser = () => ({
  type: AUTHENTICATING,
});

const authenticationSuccess = () => ({
  type: AUTHENTICATION_SUCCESS,
});

const authenticationFailure = error => ({
  type: AUTHENTICATION_FAILURE,
  error,
});

const unauthenticationUser = () => ({
  type: UNAUTHENTICATION,
});

const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    throw Error(error);
  }
};

const removeUserToken = async () => {
  await AsyncStorage.removeItem('userToken');
};

export const authUser = credentials => (dispatch) => {
  dispatch(authenticatingUser());
  Api.post
    .authentication(credentials)
    .then(async (resJson) => {
      await storeToken(resJson.auth_token);
      dispatch(authenticationSuccess());
      NavigationService.navigate('AuthLoading');
    })
    .catch((error) => {
      dispatch(authenticationFailure(error));
      dispatch(openErrDialog());
      NavigationService.navigate('AuthLoading');
    });
};

export const unAuthUser = () => async (dispatch) => {
  await removeUserToken();
  dispatch(unauthenticationUser());
  NavigationService.navigate('AuthLoading');
};
