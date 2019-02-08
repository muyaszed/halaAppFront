import { AsyncStorage } from 'react-native';
import {
  ADDING_RESTAURANT,
  ADD_RESTAURANT_SUCCESS,
  ADD_RESTAURANT_FAILED,
  GETTING_RESTAURANTS,
  GET_RESTAURANTS_SUCCESS,
  GET_RESTAURANTS_FAILURE,
} from './types';

import NavigationService from '../../NavigationService';
import Api from '../api';
import { openErrDialog } from './dialog';

const getToken = () => AsyncStorage.getItem('userToken');

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
  Api.post
    .restaurants(restaurantData, token)
    .then(() => {
      dispatch(addingRestaurantSuccess());
      NavigationService.navigate('Home');
    })
    .catch((error) => {
      dispatch(addingRestaurantFailure(error));
      dispatch(openErrDialog());
    });
};
// alternative way by using async
// return async (dispatch) => {
//     dispatch(addingRestaurant());

//     try {
//         await Api.post.restaurants(restaurantData)
//     } catch(error) {
//         dispatch(addingRestaurantFailure(error));
//     }
//     dispatch(addingRestaurantSuccess());
//     NavigationService.navigate('Home');
// }

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
    });
};
// alternative ny using async
// return async (dispatch) => {
//     dispatch(gettingRestaurants());
//     let apiCall;

//     try {
//         apiCall = await Api.get.restaurants()
//     } catch(error) {
//         dispatch(getRestaurantsFailure(error));
//     }

//     dispatch(getRestrauntsSucces(apiCall));

// }
