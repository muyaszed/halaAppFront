/* eslint-disable import/prefer-default-export */
import { AsyncStorage } from 'react-native';
import {
  GETTING_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATING_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from './types';

import Api from '../api';
import { getToken } from '../config/helpers';
import { openErrDialog } from './dialog';

const gettingUser = () => ({
  type: GETTING_USER,
});

const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  user,
});

const getUserFailure = error => ({
  type: GET_USER_FAILURE,
  error,
});

const updateUser = async (user) => {
  try {
    await AsyncStorage.setItem('currentUser', JSON.stringify(user));
  } catch (error) {
    throw Error(error);
  }
};

export const getUser = id => async (dispatch) => {
  dispatch(gettingUser());
  const token = await getToken();
  Api.get
    .user(token, id)
    .then(async (resJson) => {
      dispatch(getUserSuccess(resJson));
      await updateUser(resJson);
    })
    .catch((err) => {
      dispatch(getUserFailure(err));
      dispatch(openErrDialog(err));
    });
};

const updatingUser = () => ({
  type: UPDATING_USER,
});

const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS,
});

const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  error,
});

export const putUser = (data, id) => async (dispatch) => {
  dispatch(updatingUser());
  const token = await getToken();
  Api.put
    .user(data, token, id)
    .then(async (resJson) => {
      dispatch(updateUserSuccess(resJson));
      dispatch(getUser(id));
    })
    .catch((err) => {
      dispatch(updateUserFailure(err));
      dispatch(openErrDialog(err));
    });
};
