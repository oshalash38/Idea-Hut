import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';
// Fires an alert
export const fireAlert = (type, message, timeout = 5000) => async dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { type, message, id }
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
