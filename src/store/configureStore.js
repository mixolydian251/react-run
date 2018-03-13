import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import preferencesReducer from '../reducers/preferences';
import authReducer from '../reducers/authentication';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  return createStore(
    combineReducers({
      preferences: preferencesReducer,
      auth: authReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
};
