import {
  ADDING_RESTAURANT,
  ADD_RESTAURANT_SUCCESS,
  ADD_RESTAURANT_FAILED,
  GETTING_RESTAURANTS,
  GET_RESTAURANTS_SUCCESS,
  GET_RESTAURANTS_FAILURE,
  GETTING_RESTAURANT,
  GET_RESTAURANT_SUCCESS,
  GET_RESTAURANT_FAILURE,
  EDITING_RESTAURANTS,
  EDIT_RESTAURANTS_SUCCESS,
  EDIT_RESTAURANTS_FAILURE,
  BOOKMARKING_RESTAURANTS,
  BOOKMARK_RESTAURANTS_SUCCESS,
  BOOKMARK_RESTAURANTS_FAILURE,
  UNBOOKMARKING_RESTAURANTS,
  UNBOOKMARK_RESTAURANTS_SUCCESS,
  UNBOOKMARK_RESTAURANTS_FAILURE,
} from './types';

import { getToken } from '../config/helpers';
import NavigationService from '../../NavigationService';
import Api from '../api';
import { openErrDialog } from './dialog';
import { getUser } from './user';

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
      dispatch(getRestrauntsSucces(resJson));
    })
    .catch((error) => {
      dispatch(getRestaurantsFailure(error));
      dispatch(openErrDialog(error));
    });
};

const gettingRestaurant = () => ({
  type: GETTING_RESTAURANT,
});

const getRestrauntSucces = (data) => {
  console.log(data);
  return {
    type: GET_RESTAURANT_SUCCESS,
    data,
  };
};
// const getRestrauntSucces = data => {
//   return {
//    type: GET_RESTAURANT_SUCCESS,
//     data,
//   }
// };

const getRestaurantFailure = error => ({
  type: GET_RESTAURANT_FAILURE,
  error,
});

export const showRestaurant = restaurantId => async (dispatch) => {
  dispatch(gettingRestaurant());
  const token = await getToken();
  return Api.get
    .restaurant(token, restaurantId)
    .then((resJson) => {
      console.log('Hello', resJson);
      dispatch(getRestrauntSucces(resJson));
    })
    .catch((error) => {
      dispatch(getRestaurantFailure(error));
      dispatch(openErrDialog(error));
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
  return Api.post
    .restaurant(restaurantData, token)
    .then(() => {
      dispatch(addingRestaurantSuccess());
      dispatch(getRestaurants());
      NavigationService.navigate('Home');
    })
    .catch((error) => {
      console.log(error);
      dispatch(addingRestaurantFailure(error));
      dispatch(openErrDialog(error));
      return { error };
    });
};

const editingRestaurant = () => ({
  type: EDITING_RESTAURANTS,
});

const editingRestaurantSuccess = () => ({
  type: EDIT_RESTAURANTS_SUCCESS,
});

const editingRestaurantFailure = error => ({
  type: EDIT_RESTAURANTS_FAILURE,
  error,
});

export const editRestaurant = (data, id, userId) => async (dispatch) => {
  dispatch(editingRestaurant());
  const token = await getToken();
  return Api.put
    .restaurant(data, token, id)
    .then(() => {
      dispatch(editingRestaurantSuccess());
      dispatch(getRestaurants());
      dispatch(getUser(userId));
    })
    .catch((error) => {
      dispatch(editingRestaurantFailure(error));
      dispatch(openErrDialog(error));
      return { error };
    });
};

const bookmarkingRestaurant = () => ({
  type: BOOKMARKING_RESTAURANTS,
});

const bookmarkRestaurantSuccess = () => ({
  type: BOOKMARK_RESTAURANTS_SUCCESS,
});

const bookmarkRestaurantFailure = error => ({
  type: BOOKMARK_RESTAURANTS_FAILURE,
  error,
});

export const bookmarkRestaurant = (restaurantId, userId) => async (dispatch) => {
  dispatch(bookmarkingRestaurant());
  const token = await getToken();
  return Api.post
    .bookmark(token, restaurantId, userId)
    .then(() => {
      dispatch(bookmarkRestaurantSuccess());
      dispatch(getRestaurants());
      dispatch(getUser(userId));
    })
    .catch((error) => {
      dispatch(bookmarkRestaurantFailure(error));
      dispatch(openErrDialog(error));
      return { error };
    });
};

const unbookmarkingRestaurant = () => ({
  type: UNBOOKMARKING_RESTAURANTS,
});

const unbookmarkRestaurantSuccess = () => ({
  type: UNBOOKMARK_RESTAURANTS_SUCCESS,
});

const unbookmarkRestaurantFailure = error => ({
  type: UNBOOKMARK_RESTAURANTS_FAILURE,
  error,
});

export const unbookmarkRestaurant = (restaurantId, userId) => async (dispatch) => {
  dispatch(unbookmarkingRestaurant());
  const token = await getToken();
  return Api.post
    .unbookmark(token, restaurantId, userId)
    .then(() => {
      dispatch(unbookmarkRestaurantSuccess());
      dispatch(getRestaurants());
      dispatch(getUser(userId));
    })
    .catch((error) => {
      dispatch(unbookmarkRestaurantFailure(error));
      dispatch(openErrDialog(error));
      return { error };
    });
};
