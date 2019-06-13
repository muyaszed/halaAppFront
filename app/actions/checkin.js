import {
  CHECKINGIN_RESTAURANT,
  CHECKIN_RESTAURANT_SUCCESS,
  CHECKIN_RESTAURANT_FAILURE,
} from './types';

import { getToken } from '../config/helpers';
import Api from '../api';
import { openErrDialog } from './dialog';
import { getUser } from './user';
import { getRestaurants } from './restaurant';

const checkingInRestaurant = () => ({
  type: CHECKINGIN_RESTAURANT,
});

const checkinRestaurantSuccess = () => ({
  type: CHECKIN_RESTAURANT_SUCCESS,
});

const checkinRestaurantFailure = error => ({
  type: CHECKIN_RESTAURANT_FAILURE,
  error,
});

export const checkinRestaurant = (restaurantId, userId) => async (dispatch) => {
  dispatch(checkingInRestaurant());
  const token = await getToken();
  return Api.post
    .checkin(token, restaurantId, userId)
    .then(() => {
      dispatch(checkinRestaurantSuccess());
      dispatch(getRestaurants());
      dispatch(getUser(userId));
    })
    .catch((error) => {
      dispatch(checkinRestaurantFailure(error));
      dispatch(openErrDialog(error));
      return { error };
    });
};
