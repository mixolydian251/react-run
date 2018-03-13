import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import RunPage from '../components/RunPage';
import DataPage from "../components/DataPage";
import SettingsPage from '../components/SettingsPage'
import Navigation from '../components/NavigationBar';
import NotFoundPage from '../components/NotFoundPage';

import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';


const history = createHistory();

class AppRouter extends React.Component {
  render() {
    return (
      <Router
        history={history}>
        <div>
          <Switch>
            <Route path="/" component={RunPage} exact={true} />
            <Route path="/data" component={DataPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route component={NotFoundPage}/>
          </Switch>
          <Navigation/>
        </div>
      </Router>
    );
  }
}

export default AppRouter;

export { history };
