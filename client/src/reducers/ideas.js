import { COMPOSE_IDEA } from '../actions/types';

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
        loading: false
      };
    default:
      return state;
  }
};
