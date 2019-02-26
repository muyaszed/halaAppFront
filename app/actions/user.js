/* eslint-disable import/prefer-default-export */
import { AsyncStorage } from 'react-native';
import { GETTING_USER, GET_USER_SUCCESS, GET_USER_FAILURE } from './types';

import Api from '../api';
import { getToken } from '../config/helpers';

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
    });
};
