import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index';
import initialState from './store/initialState';
import AppRoutes from './routes';

const store = createStore(reducers, initialState, applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Provider store={store}>
    <Router history={history} >
      {AppRoutes}
    </Router>
  </Provider>
)

ReactDOM.render(
  router,
  document.getElementById('main')
);
