import { SIGNUP_USER } from './types';
import api from '../utils/api';

// formData: {email, password}
export const signup = formData => async dispatch => {
  try {
    const res = await api.post('/auth/signup', formData);
    dispatch({
      type: SIGNUP_USER,
      payload: res.data
    });
  } catch (err) {
    console.log('Registration failed');
  }
};
