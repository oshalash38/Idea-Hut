import { SIGNUP_USER, AUTH_FAILURE } from '../actions/types';

const initalState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  currUser: null
};

export default (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_USER:
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false
      };
    case AUTH_FAILURE:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        currUser: null
      };
    default:
      return state;
  }
};
