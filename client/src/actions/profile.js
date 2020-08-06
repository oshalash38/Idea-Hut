import api, { apiFormData } from '../utils/api';
import { UPDATE_PROFILE } from './types';
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
  } catch (err) {}
};
