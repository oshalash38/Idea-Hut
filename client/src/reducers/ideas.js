import {
  COMPOSE_IDEA,
  CLEAR_CURR_IDEA,
  GET_IDEAS_BY_ID,
  GET_IDEA,
  IDEA_ERR,
  GET_ALL_IDEAS,
  LIKE_IDEA,
  UPDATE_LIKE,
  UPDATE_BOOKMARK
} from '../actions/types';

const initialState = {
  ideas: [],
  currIdea: null,
  loading: true,
  errors: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case COMPOSE_IDEA:
      return {
        ...state,
        ideas: [payload, ...state.ideas],
        currIdea: payload,
        loading: false,
        errors: {}
      };
    case GET_IDEA:
      return { ...state, currIdea: payload, loading: false };
    case GET_IDEAS_BY_ID:
    case GET_ALL_IDEAS:
      return { ...state, ideas: payload, loading: false };
    case UPDATE_LIKE:
      return {
        ...state,
        currIdea: { ...state.currIdea, likes: payload },
        loading: false
      };
    case CLEAR_CURR_IDEA:
      return {
        ...state,
        currIdea: null,
        loading: false
      };
    case IDEA_ERR:
      return { ...state, currIdea: null, errors: payload, loading: false };
    default:
      return state;
  }
};
