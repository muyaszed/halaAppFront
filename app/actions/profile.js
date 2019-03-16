import { EDITING_PROFILE, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILURE } from './types';
import Api from '../api';
import { getToken } from '../config/helpers';
import { getUser } from './user';
import { openErrDialog } from './dialog';

const editingProfile = () => ({
  type: EDITING_PROFILE,
});

const editProfileSucces = () => ({
  type: EDIT_PROFILE_SUCCESS,
});

const editProfileFailure = error => ({
  type: EDIT_PROFILE_FAILURE,
  error,
});

export const editAvatar = (avatarUri, userId, id) => async (dispatch) => {
  dispatch(editingProfile());
  const token = await getToken();
  return Api.put
    .avatar(token, avatarUri, id)
    .then(() => {
      dispatch(editProfileSucces());
      dispatch(getUser(userId));
    })
    .catch((error) => {
      dispatch(editProfileFailure(error));
      dispatch(openErrDialog(error));
      return { error };
    });
};

export const editDetails = (data, userId, id) => async (dispatch) => {
  dispatch(editingProfile());
  const token = await getToken();
  Api.put
    .profile(token, data, id)
    .then(() => {
      dispatch(editProfileSucces());
      dispatch(getUser(userId));
    })
    .catch((error) => {
      dispatch(editProfileFailure(error));
      dispatch(openErrDialog(error));
    });
};
