import {
  UPDATE_PROFILE,
  PROFILE_ERR,
  GET_PROFILE,
  CLEAROUT_PROFILE,
  RESET_LOADING,
  UPDATE_BOOKMARK
} from '../actions/types';

const initalState = {
  currProfile: null,
  loading: true,
  errors: {}
};

export default (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        loading: false,
        currProfile: payload
      };
    case UPDATE_BOOKMARK:
      return {
        ...state,
        currProfile: { ...state.currProfile, bookmarked: payload }
      };
    case CLEAROUT_PROFILE:
      return { ...state, currProfile: null, loading: false };
    case PROFILE_ERR:
      return { ...state, currProfile: null, loading: false, errors: payload };
    case RESET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
