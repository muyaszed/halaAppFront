import { ADDING_RESTAURANT, ADD_RESTAURANT_SUCCESS, ADD_RESTAURANT_FAILED } from '../actions/types';

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
                isAdding: true
            }
        case ADD_RESTAURANT_SUCCESS:
            return {
                ...state,
                data: action.data,
                isAdding: false,
                dataAdded: true
            }
        case ADD_RESTAURANT_FAILED:
            return {
                ...state,
                data: [],
                isAdding: false,
                dataAdded: false,
                error: action.data
            }
        
        default:
            return state;
    }
};

export default restaurantReducer;