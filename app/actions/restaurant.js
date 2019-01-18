import { ADDING_RESTAURANT, 
         ADD_RESTAURANT_SUCCESS, 
         ADD_RESTAURANT_FAILED,
         GETTING_RESTAURANTS,
         GET_RESTAURANTS_SUCCESS,
         GET_RESTAURANTS_FAILURE
        } from './types';

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
        return fetch('http://localhost:3000/restaurants', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(restaurantData)
        }).then(res => {
            dispatch(addingRestaurantSuccess(res.json()));
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
        return fetch('http://localhost:3000/restaurants')
            .then(response => response.json())
            .then(resJson => {
                dispatch(getRestrauntsSucces(resJson));
            }).catch(error => {
                dispatch(getRestaurantsFailure(error));
            });
    }
}