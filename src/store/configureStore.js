import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import runReducer from '../reducers/run';
import authReducer from '../reducers/authentication';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  return createStore(
    combineReducers({
      runs: runReducer,
      auth: authReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
};
