import { ADDING_RESTAURANT, ADD_RESTAURANT_SUCCESS, ADD_RESTAURANT_FAILED } from './types';

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
    type: ADD_RESTAURANT_FAILED,
    error
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