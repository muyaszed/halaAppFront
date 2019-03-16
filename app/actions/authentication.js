import { AsyncStorage } from 'react-native';
import {
  AUTHENTICATING,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
  UNAUTHENTICATION,
  SIGNING_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
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
      dispatch(openErrDialog(error));
      
    });
};

export const unAuthUser = () => async (dispatch) => {
  await removeItemFromAsyncStore('currentUser');
  await removeItemFromAsyncStore('userToken');
  dispatch(unauthenticationUser());
  NavigationService.navigate('AuthLoading');
};

const signingUp = () => ({
  type: SIGNING_IN,
});

const signInSuccess = () => ({
  type: SIGN_IN_SUCCESS,
});

const signInFailure = error => ({
  type: SIGN_IN_FAILURE,
  error,
});

export const signUpUser = credentials => (dispatch) => {
  dispatch(signingUp());
  Api.post
    .user(credentials)
    .then(async (resJson) => {
      await setItemToAsyncStore('userToken', resJson.auth_token[0]);
      await setItemToAsyncStore('currentUser', JSON.stringify(resJson.user));
      dispatch(signInSuccess());
      NavigationService.navigate('AuthLoading');
    })
    .catch((error) => {
      dispatch(signInFailure(error));
      dispatch(openErrDialog(error));
      // NavigationService.navigate('AuthLoading');
    });
};
