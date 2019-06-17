import {
  FILTERING_RESTAURANTS,
  FILTER_RESTAURANT_SUCCESS,
  FILTER_RESTAURNT_FAILURE,
} from '../actions/types';

const initialState = {
  filteredData: [],
  isFiltering: false,
  isFiltered: false,
  errors: '',
};

const ListfilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTERING_RESTAURANTS:
      return {
        ...state,
        isFiltering: true,
      };
    case FILTER_RESTAURANT_SUCCESS:
      return {
        ...state,
        isFiltering: false,
        isFiltered: true,
        filteredData: action.list,
      };
    case FILTER_RESTAURNT_FAILURE:
      return {
        ...state,
        isFiltering: false,
        isFiltered: false,
        filteredData: [],
        error: action.error.message,
      };
    default:
      return state;
  }
};

export default ListfilterReducer;
