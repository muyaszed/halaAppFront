import { ADDING_RESTAURANT, 
         ADD_RESTAURANT_SUCCESS, 
         ADD_RESTAURANT_FAILED,
         GETTING_RESTAURANTS,
         GET_RESTAURANTS_SUCCESS,
         GET_RESTAURANTS_FAILURE
        } from './types';

import NavigationService from '../../NavigationService';
import Api from '../../api';
import App from '../App';

const addingRestaurant = () => {
    return {
        type: ADDING_RESTAURANT,
    }
}

const addingRestaurantSuccess = (res) => {
    return {
        type: ADD_RESTAURANT_SUCCESS,
        res
    }
}

const addingRestaurantFailure = (error) => {
    return {
        type: ADD_RESTAURANT_FAILED,
        error
    }
    
}

export const addRestaurant = restaurantData => {

    return (dispatch) => {
        dispatch(addingRestaurant());
        Api.post.restaurants(restaurantData).then(res => {
            dispatch(addingRestaurantSuccess(res.json()));
            NavigationService.navigate('Home');
        }).catch(error => {
            dispatch(addingRestaurantFailure(error));
        })
    }
    
}

const gettingRestaurants = () => {
    return {
        type: GETTING_RESTAURANTS,
    }
}

const getRestrauntsSucces = data => {
    return {
        type: GET_RESTAURANTS_SUCCESS,
        data
    }
}

const getRestaurantsFailure = error => {
    return {
        type: GET_RESTAURANTS_FAILURE,
        error
    }
}

export const getRestaurants = () => {
    return (dispatch) => {
        dispatch(gettingRestaurants());
        Api.get.restaurants()
            .then(resJson => {
                dispatch(getRestrauntsSucces(resJson));
            }).catch(error => {
                dispatch(getRestaurantsFailure(error));
            });
    }
}