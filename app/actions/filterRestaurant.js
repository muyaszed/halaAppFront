import {
  FILTERING_RESTAURANTS,
  FILTER_RESTAURANT_SUCCESS,
  FILTER_RESTAURNT_FAILURE,
} from './types';

import { calculateDistance, getPosition } from '../config/helpers';
// import { get} from './restaurant';

const filteringRestaurants = () => ({
  type: FILTERING_RESTAURANTS,
});

const filterRestaurantSuccess = list => ({
  type: FILTER_RESTAURANT_SUCCESS,
  list,
});

const filterRestaurantFailure = error => ({
  type: FILTER_RESTAURNT_FAILURE,
  error,
});

export const filterByDistance = list => (dispatch) => {
  dispatch(filteringRestaurants());

  getPosition()
    .then((position) => {
      const updatedList = [];
      list.map((item) => {
        const distance = calculateDistance(
          position.coords.latitude,
          position.coords.longitude,
          item.latitude,
          item.longitude,
        );
        item.distance = Math.round(distance);
        updatedList.push(item);
      });

      const filteredList = updatedList.sort((a, b) => a.distance - b.distance);

      dispatch(filterRestaurantSuccess(filteredList));
    })
    .catch((error) => {
      dispatch(filterRestaurantFailure(error));
    });
};

export const filterByLatest = list => (dispatch) => {
  dispatch(filteringRestaurants());

  getPosition()
    .then((position) => {
      const updatedList = [];
      list.map((item) => {
        const distance = calculateDistance(
          position.coords.latitude,
          position.coords.longitude,
          item.latitude,
          item.longitude,
        );
        item.distance = Math.round(distance);
        updatedList.push(item);
      });

      const filteredList = updatedList.sort((a, b) => b.updated_at - a.updated_at);

      dispatch(filterRestaurantSuccess(filteredList));
    })
    .catch((error) => {
      dispatch(filterRestaurantFailure(error));
    });
};
