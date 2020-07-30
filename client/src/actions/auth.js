import { SIGNUP_USER, AUTH_FAILURE } from './types';
import api from '../utils/api';
import { fireAlert } from './alert';

// formData: {email, password}
export const signup = formData => async dispatch => {
  try {
    const res = await api.post('/auth/signup', formData);
    dispatch({
      type: SIGNUP_USER,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(fireAlert('danger', error.msg)));
    }

    dispatch({
      type: AUTH_FAILURE
    });
  }
};
