import { ADDING_RESTAURANT, 
         ADD_RESTAURANT_SUCCESS, 
         ADD_RESTAURANT_FAILED,
         GETTING_RESTAURANTS,
         GET_RESTAURANTS_SUCCESS,
         GET_RESTAURANTS_FAILURE 
        } from '../actions/types';

const initialState = {
    data: [],
    dataAdded: false,
    isAdding: false,
    error: false
}

const restaurantReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADDING_RESTAURANT:
            return {
                ...state,
                data: [],
                isAdding: true,
                dataAdded: false,
                error: false
            }
        case ADD_RESTAURANT_SUCCESS:
            return {
                ...state,
                data: [],
                isAdding: false,
                dataAdded: true
            }
        case ADD_RESTAURANT_FAILED:
            return {
                ...state,
                data: [],
                isAdding: false,
                dataAdded: false,
                error: action.error
            }
        case GETTING_RESTAURANTS:
            return {
                ...state,
                data: [],
                isAdding: true,
                dataAdded: false,
                error: false
            }
        case GET_RESTAURANTS_SUCCESS:
            return {
                ...state,
                data: action.data,
                isAdding:false,
                dataAdded: true,
                error: false
            }
        case GET_RESTAURANTS_FAILURE:
            return {
                ...state,
                data: [],
                isAdding: false,
                dataAdded: false,
                error: action.error
            }
        
        default:
            return state;
    }
};

export default restaurantReducer;