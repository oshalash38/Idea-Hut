import { SIGNUP_USER, AUTH_FAILURE, LOAD_USER, SIGNIN_USER } from './types';
import api from '../utils/api';
import { fireAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Signs up a new user
// formData: {email, password}
export const signup = formData => async dispatch => {
  try {
    const res = await api.post('/auth/signup', formData);
    await dispatch({
      type: SIGNUP_USER,
      payload: res.data
    });
    setAuthToken(res.data.token);
    dispatch(loadCurrUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(fireAlert('danger', error.msg)));
    }
    await dispatch({
      type: AUTH_FAILURE
    });
  }
};

// Signs in an existing user
// formData: {email, password}
export const signin = formData => async dispatch => {
  try {
    const res = await api.post('/auth/signin', formData);
    await dispatch({
      type: SIGNIN_USER,
      payload: res.data
    });
    setAuthToken(res.data.token);
    dispatch(loadCurrUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(fireAlert('danger', error.msg)));
    }
    await dispatch({
      type: AUTH_FAILURE
    });
  }
};

// Loads the current user
export const loadCurrUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await api.get('/auth');
    dispatch({
      type: LOAD_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAILURE
    });
  }
};
