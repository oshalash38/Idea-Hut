import { SIGNUP_USER } from '../actions/types';

const initalState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
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
    default:
      return state;
  }
};
