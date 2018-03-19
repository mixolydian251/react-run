import 'normalize.css/normalize.css';
import './styles/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { firebase } from './firebase/firebase';
import { login, logout } from './actions/authentication';
import configureStore from './store/configureStore';
import AppRouter, { history } from './routers/AppRouter';
import Loading from './components/Loading'
import { startSetRuns } from "./actions/run";

const store = configureStore();


ReactDOM.render(<Loading/>, document.getElementById('app'));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

firebase.auth().onAuthStateChanged( user => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetRuns(user.uid));
    renderApp();
  } else {
    store.dispatch(logout());
    renderApp();
  }
});