import {
  UPDATE_PROFILE,
  PROFILE_ERR,
  GET_PROFILE,
  CLEAROUT_PROFILE
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
    case CLEAROUT_PROFILE:
      return { ...state, currProfile: null, loading: false };
    case PROFILE_ERR:
      return { ...state, currProfile: null, loading: false, errors: payload };
    default:
      return state;
  }
};
