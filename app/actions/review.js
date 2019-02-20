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
  DELETING_REVIEW,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
} from './types';
import Api from '../api';
import { getToken } from '../config/helpers';
import { openErrDialog } from './dialog';

const gettingReviews = () => ({
  type: GETTING_REVIEWS,
});

const getReviewSuccess = reviews => ({
  type: GET_REVIEWS_SUCCESS,
  reviews,
});

const getReviewFailure = error => ({
  type: GET_REVIEWS_FAILURE,
  error,
});

export const getReviews = id => async (dispatch) => {
  dispatch(gettingReviews());
  const token = await getToken();
  Api.get
    .reviews(token, id)
    .then((resJson) => {
      console.log(resJson);
      dispatch(getReviewSuccess(resJson));
    })
    .catch((err) => {
      dispatch(getReviewFailure(err));
    });
};

const postingReview = () => ({
  type: POSTING_REVIEW,
});

const postReviewSuccess = () => ({
  type: POST_REVIEW_SUCCESS,
});

const postReviewFailure = error => ({
  type: POST_REVIEW_FAILURE,
  error,
});

export const postReview = (comment, id) => async (dispatch) => {
  console.log(comment, id);
  dispatch(postingReview());
  const token = await getToken();
  Api.post
    .reviews(token, comment, id)
    .then(() => {
      dispatch(postReviewSuccess());
      dispatch(getReviews(id));
    })
    .catch((err) => {
      console.log(err);
      dispatch(postReviewFailure(err));
      dispatch(openErrDialog());
    });
};

const editingReview = () => ({
  type: EDITING_REVIEW,
});

const editReviewSuccess = () => ({
  type: EDIT_REVIEW_SUCCESS,
});

const editReviewFailure = error => ({
  type: EDIT_REVIEW_FAILURE,
  error,
});

export const editReview = (comment, restaurantId, id) => async (dispatch) => {
  dispatch(editingReview());
  const token = await getToken();
  console.log(id);
  Api.put
    .review(token, comment, restaurantId, id)
    .then(() => {
      dispatch(editReviewSuccess());
      dispatch(getReviews(restaurantId));
    })
    .catch((err) => {
      console.log(err);
      dispatch(editReviewFailure(err));
      dispatch(openErrDialog());
    });
};

const deletingReview = () => ({
  type: DELETING_REVIEW,
});

const deleteReviewSuccess = () => ({
  type: DELETE_REVIEW_SUCCESS,
});

const deleteReviewFailure = error => ({
  type: DELETE_REVIEW_FAILURE,
  error,
});

export const deleteReview = (restaurantId, id) => async (dispatch) => {
  dispatch(deletingReview());
  const token = await getToken();
  Api.delete
    .review(token, restaurantId, id)
    .then(() => {
      dispatch(deleteReviewSuccess());
      dispatch(getReviews(restaurantId));
    })
    .catch((err) => {
      dispatch(deleteReviewFailure(err));
      dispatch(openErrDialog());
    });
};
