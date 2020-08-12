import api from '../utils/api';
import { COMPOSE_IDEA } from './types';
import { fireAlert } from './alert';

// Compose a new idea
export const composeIdea = (formData, history) => async dispatch => {
  try {
    const res = await api.post('/ideas', formData);
    dispatch({ type: COMPOSE_IDEA, payload: res.data });
    // history.push(`/ideas/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(fireAlert('danger', error.msg)));
    }
  }
};
