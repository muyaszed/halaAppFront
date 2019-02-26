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
import { setItemToAsyncStore, removeItemFromAsyncStore } from '../config/helpers';

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

export const authUser = credentials => (dispatch) => {
  dispatch(authenticatingUser());
  Api.post
    .authentication(credentials)
    .then(async (resJson) => {
      console.log(resJson.user);
      await setItemToAsyncStore('userToken', resJson.auth_token);
      await setItemToAsyncStore('currentUser', JSON.stringify(resJson.user));
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
  await removeItemFromAsyncStore('currentUser');
  await removeItemFromAsyncStore('userToken');
  dispatch(unauthenticationUser());
  NavigationService.navigate('AuthLoading');
};
