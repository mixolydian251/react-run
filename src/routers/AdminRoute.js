import React from 'react';
import { connect } from 'react-redux';
import { admins } from '../firebase/firebase';
import { Route, Redirect } from 'react-router-dom';

export const AdminRoute = ({
 authId,
 component: Component,
 ...rest
 }) => {
  return (
    <Route
      {...rest}
      component={props =>
        admins.includes(authId) ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/"/>
        )
      }
    />
  )
};

const mapStateToProps = state => ({
  authId: state.auth.uid
});

export default connect(mapStateToProps)(AdminRoute);