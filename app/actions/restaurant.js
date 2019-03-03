import {
  ADDING_RESTAURANT,
  ADD_RESTAURANT_SUCCESS,
  ADD_RESTAURANT_FAILED,
  GETTING_RESTAURANTS,
  GET_RESTAURANTS_SUCCESS,
  GET_RESTAURANTS_FAILURE,
} from './types';

import { getToken } from '../config/helpers';
import NavigationService from '../../NavigationService';
import Api from '../api';
import { openErrDialog } from './dialog';

const gettingRestaurants = () => ({
  type: GETTING_RESTAURANTS,
});

const getRestrauntsSucces = data => ({
  type: GET_RESTAURANTS_SUCCESS,
  data,
});

const getRestaurantsFailure = error => ({
  type: GET_RESTAURANTS_FAILURE,
  error,
});

export const getRestaurants = () => async (dispatch) => {
  dispatch(gettingRestaurants());
  const token = await getToken();
  Api.get
    .restaurants(token)
    .then((resJson) => {
      console.log(resJson);
      dispatch(getRestrauntsSucces(resJson));
    })
    .catch((error) => {
      dispatch(getRestaurantsFailure(error));
    });
};

const addingRestaurant = () => ({
  type: ADDING_RESTAURANT,
});

const addingRestaurantSuccess = () => ({
  type: ADD_RESTAURANT_SUCCESS,
});

const addingRestaurantFailure = error => ({
  type: ADD_RESTAURANT_FAILED,
  error,
});

export const addRestaurant = restaurantData => async (dispatch) => {
  dispatch(addingRestaurant());
  const token = await getToken();
  console.log(restaurantData);
  Api.post
    .restaurants(restaurantData, token)
    .then(() => {
      dispatch(addingRestaurantSuccess());
      dispatch(getRestaurants());
      NavigationService.navigate('Home');
    })
    .catch((error) => {
      dispatch(addingRestaurantFailure(error));
      dispatch(openErrDialog());
    });
};
