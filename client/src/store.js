import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
// import setAuthToken from './utils/setAuthToken';

const intialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// let currentState = store.getState();

// store.subscribe(() => {
//   // keep track of the previous and current state to compare changes
//   let previousState = currentState;
//   currentState = store.getState();
//   console.log(currentState);
//   console.log(previousState);
//   // if the token changes set the value in localStorage and axios headers
//   if (previousState.auth.token !== currentState.auth.token) {
//     const token = currentState.auth.token;
//     setAuthToken(token);
//   }
// });
export default store;
