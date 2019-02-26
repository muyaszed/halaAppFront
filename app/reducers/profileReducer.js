import { EDITING_PROFILE, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILURE } from '../actions/types';

const initialState = {
  isEditing: false,
  profileEdited: false,
  errors: '',
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDITING_PROFILE:
      return {
        ...state,
        isEditing: true,
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        isEditing: false,
        profileEdited: true,
      };
    case EDIT_PROFILE_FAILURE:
      return {
        ...state,
        profileEdited: false,
        errors: action.errror.message,
      };

    default:
      return state;
  }
};

export default ProfileReducer;
