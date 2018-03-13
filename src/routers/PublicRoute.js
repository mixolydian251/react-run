import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
                              isAuthenticated,
                              component: Component,
                              ...rest
                            }) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <div>
          <Redirect to="/" />
        </div>
      ) : (
        <div>
          <Component {...props} />
        </div>
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.uid,
  isLoading: state.loading.loading
});

export default connect(mapStateToProps)(PublicRoute);
