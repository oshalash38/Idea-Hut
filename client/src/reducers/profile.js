import { UPDATE_PROFILE } from '../actions/types';

const initalState = {
  currProfile: null,
  loading: true
};

export default (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        loading: false,
        currProfile: payload
      };
    default:
      return state;
  }
};
