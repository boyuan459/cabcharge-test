import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import App from './container/App/App';
import asyncComponent from './helpers/AsyncFunc';

const DefaultRoute = ({ ...rest }) =>
  <Route
    {...rest}
    render={props =>
       <Redirect
            to={{
              pathname: '/dashboard',
              state: { from: props.location }
            }}
          />}
  />;

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      isLoggedIn
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />}
  />;
const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <DefaultRoute
          exact
          path={'/'}
        />
        <Route
          path="/dashboard"
          component={App}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </ConnectedRouter>
  );
};

export default connect()(PublicRoutes);
