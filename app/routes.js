import React from 'react';
import { IndexRedirect, IndexRoute, Route } from 'react-router';

import { App } from './components/App';
import DashboardContainer from './containers/DashboardContainer';
import LoginContainer from './containers/LoginContainer';

export default (
  <Route path='/' component={App}>
    <IndexRedirect to='login' />
    <Route path='dashboard' component={DashboardContainer} />
    <Route path='login' component={LoginContainer} />
  </Route>
);