import api, { apiFormData } from '../utils/api';
import { UPDATE_PROFILE, PROFILE_ERR, GET_PROFILE } from './types';
import { fireAlert } from './alert';

// Creates or updates a profile
export const createOrUpdateProfile = input => async dispatch => {
  try {
    console.log(input);
    let formData = new FormData();
    for (var key in input) {
      formData.append(key, input[key]);
    }
    console.log(localStorage.getItem('token'));
    const res = await apiFormData.post('/profile', formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(fireAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERR,
      payload: {
        msg: err.response.statusText + ': ' + err.response.data.msg,
        status: err.response.status
      }
    });
  }
};

// Gets current user's profile
export const getCurrProfile = () => async dispatch => {
  try {
    const res = await api.get('/profile/me');
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(fireAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERR,
      payload: {
        msg: err.response.statusText + ': ' + err.response.data.msg,
        status: err.response.status
      }
    });
  }
};

// Gets user's profile by its id
export const getProfileById = id => async dispatch => {
  try {
    const res = await api.get(`/profile/id/${id}`);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(fireAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERR,
      payload: {
        msg: err.response.statusText + ': ' + err.response.data.msg,
        status: err.response.status
      }
    });
  }
};
