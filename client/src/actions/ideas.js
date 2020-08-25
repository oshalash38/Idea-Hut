import api from '../utils/api';
import {
  COMPOSE_IDEA,
  GET_IDEAS_BY_ID,
  GET_IDEA,
  IDEA_ERR,
  GET_ALL_IDEAS,
  LIKE_IDEA,
  UPDATE_LIKE,
  UPDATE_BOOKMARK,
  ADD_COMMENT
} from './types';
import { fireAlert } from './alert';
import { getProfileById } from './profile';

// Compose a new idea
export const composeIdea = formData => async dispatch => {
  try {
    const res = await api.post('/ideas', formData);
    dispatch({ type: COMPOSE_IDEA, payload: res.data });
    // history.push(`/ideas/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(fireAlert('danger', error.msg)));
    }
    console.log(err.response.data);

    dispatch({
      type: IDEA_ERR,
      payload: {
        msg: err.response.statusText + ': ' + err.response.data.msg,
        status: err.response.status
      }
    });
  }
};

// Returns an array of ideas from their ids
export const getIdeasByIds = ids => async dispatch => {
  try {
    const ideas = await Promise.all(
      ids.map(async id => {
        return await api.get(`/ideas/idea/${id}`);
      })
    );
    const payload = ideas.map(idea => idea.data);
    dispatch({ type: GET_IDEAS_BY_ID, payload });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(fireAlert('danger', error.msg)));
    }
  }
};

// Gets idea by its id
export const getIdeaById = id => async dispatch => {
  try {
    const res = await api.get(`/ideas/idea/${id}`);
    dispatch({ type: GET_IDEA, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(fireAlert('danger', error.msg)));
    }
  }
};

// Gets all ideas
export const getAllIdeas = () => async dispatch => {
  try {
    const res = await api.get('/ideas/all');
    dispatch({ type: GET_ALL_IDEAS, payload: res.data });
  } catch (err) {
    dispatch({
      type: IDEA_ERR,
      payload: {
        msg: err.response.statusText + ': ' + err.response.data.msg,
        status: err.response.status
      }
    });
  }
};

// Likes an idea
export const likeIdea = id => async dispatch => {
  try {
    const res = await api.put(`/ideas/idea/like/${id}`);
    dispatch({ type: UPDATE_LIKE, payload: res.data });
  } catch (err) {
    dispatch({
      type: IDEA_ERR,
      payload: {
        msg: err.response.statusText + ': ' + err.response.data.msg,
        status: err.response.status
      }
    });
  }
};

// Unlikes an idea

// Bookmarks an idea
export const bookmarkIdea = id => async dispatch => {
  try {
    const res = await api.put(`/ideas/idea/bookmark/${id}`);
    dispatch({ type: UPDATE_BOOKMARK, payload: res.data });
  } catch (err) {
    dispatch({
      type: IDEA_ERR,
      payload: {
        msg: err.response.statusText + ': ' + err.response.data.msg,
        status: err.response.status
      }
    });
  }
};

// Adds a comment to idea with id <id>
export const addComment = (id, text) => async dispatch => {
  try {
    const res = await api.put(`/ideas/idea/comment/${id}`, text);
    dispatch({ type: ADD_COMMENT, payload: res.data });
  } catch (err) {
    dispatch({
      type: IDEA_ERR,
      payload: {
        msg: err.response.statusText + ': ' + err.response.data.msg,
        status: err.response.status
      }
    });
  }
};
