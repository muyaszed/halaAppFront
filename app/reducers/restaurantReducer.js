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
} from '../actions/types';

const initialState = {
  data: [],
  singleData: {},
  dataAdded: false,
  isAdding: false,
  dataRecieved: false,
  isGetting: false,
  isShowing: false,
  restaurantShowed: false,
  dataEdited: false,
  isEditing: false,
  errorFlag: false,
  errors: '',
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDING_RESTAURANT:
      return {
        ...state,
        isAdding: true,
        dataAdded: false,
      };
    case ADD_RESTAURANT_SUCCESS:
      return {
        ...state,
        isAdding: false,
        dataAdded: true,
      };
    case ADD_RESTAURANT_FAILED:
      return {
        ...state,
        isAdding: false,
        dataAdded: false,
        errors: action.error.message,
      };
    case GETTING_RESTAURANTS:
      return {
        ...state,
        isGetting: true,
        dataRecieved: false,
      };
    case GET_RESTAURANTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        dataRecieved: true,
      };
    case GET_RESTAURANTS_FAILURE:
      return {
        ...state,
        isGetting: false,
        dataRecieved: false,
        errors: action.error.message,
      };
    case GETTING_RESTAURANT:
      return {
        ...state,
        isShowing: true,
        restaurantShowed: false,
      };
    case GET_RESTAURANT_SUCCESS:
      return {
        ...state,
        singleData: action.data,
        restaurantShowed: true,
      };
    case GET_RESTAURANT_FAILURE:
      return {
        ...state,
        isShowing: false,
        restaurantShowed: false,
        errors: action.error.message,
      };
    case EDITING_RESTAURANTS:
      return {
        ...state,
        isEdited: true,
      };
    case EDIT_RESTAURANTS_SUCCESS:
      return {
        ...state,
        isEdited: false,
        dataEdited: true,
      };
    case EDIT_RESTAURANTS_FAILURE:
      return {
        ...state,
        error: action.error.message,
      };
    default:
      return state;
  }
};

export default restaurantReducer;
