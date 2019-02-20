import {
  GETTING_REVIEWS,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
  POSTING_REVIEW,
  POST_REVIEW_SUCCESS,
  POST_REVIEW_FAILURE,
  EDITING_REVIEW,
  EDIT_REVIEW_SUCCESS,
  EDIT_REVIEW_FAILURE,
} from '../actions/types';

const initialState = {
  data: [],
  gettingReviews: false,
  recievedReviews: false,
  postingReview: false,
  sendReview: false,
  editingReview: false,
  editedReview: false,
  errors: '',
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_REVIEWS:
      return {
        ...state,
        gettingReviews: true,
      };
    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        gettingReviews: false,
        recievedReviews: true,
        data: action.reviews,
      };
    case GET_REVIEWS_FAILURE:
      return {
        ...state,
        errors: action.error.message,
      };
    case POSTING_REVIEW:
      return {
        ...state,
        postingReview: true,
      };
    case POST_REVIEW_SUCCESS:
      return {
        ...state,
        postingReview: false,
        sendReview: true,
      };
    case POST_REVIEW_FAILURE:
      return {
        ...state,
        errors: action.error.message,
      };
    case EDITING_REVIEW:
      return {
        ...state,
        editingReview: true,
      };
    case EDIT_REVIEW_SUCCESS:
      return {
        ...state,
        editedReview: true,
        editingReview: false,
      };
    case EDIT_REVIEW_FAILURE:
      return {
        ...state,
        editingReview: false,
        errors: action.error.message,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reviewsReducer;
