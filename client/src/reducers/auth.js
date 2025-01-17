import {
  SIGNUP_USER,
  AUTH_FAILURE,
  LOAD_USER,
  SIGNIN_USER,
  SIGNOUT_USER
} from '../actions/types';

const initalState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  currUser: null
};

export default (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        currUser: payload
      };
    case SIGNUP_USER:
    case SIGNIN_USER:
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false
      };
    case AUTH_FAILURE:
    case SIGNOUT_USER:
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
