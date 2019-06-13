import {
  BOOKMARKING_RESTAURANTS,
  BOOKMARK_RESTAURANTS_SUCCESS,
  BOOKMARK_RESTAURANTS_FAILURE,
  UNBOOKMARKING_RESTAURANTS,
  UNBOOKMARK_RESTAURANTS_SUCCESS,
  UNBOOKMARK_RESTAURANTS_FAILURE,
} from '../actions/types';

const initialState = {
  isBookmarking: false,
  bookmarked: false,
  isUnBookmarking: false,
  Unbookmarked: false,
  errors: '',
};

const BookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKMARKING_RESTAURANTS:
      return {
        ...state,
        isBookmarking: true,
      };

    case BOOKMARK_RESTAURANTS_SUCCESS:
      return {
        ...state,
        isBookamrking: false,
        bookmarked: true,
      };
    case BOOKMARK_RESTAURANTS_FAILURE:
      return {
        ...state,
        bookmarked: false,
        errors: action.error.message,
      };
    case UNBOOKMARKING_RESTAURANTS:
      return {
        ...state,
        isUnBookmarking: true,
      };

    case UNBOOKMARK_RESTAURANTS_SUCCESS:
      return {
        ...state,
        isUnBookamrking: false,
        Unbookmarked: true,
      };
    case UNBOOKMARK_RESTAURANTS_FAILURE:
      return {
        ...state,
        Unbookmarked: false,
        errors: action.error.message,
      };
    default:
      return state;
  }
};

export default BookmarkReducer;
