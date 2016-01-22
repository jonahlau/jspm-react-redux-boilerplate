'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'redux-simple-router'

import getRoutes from './routes'

import reducers from './redux/reducers'

let combinedReducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));

const reduxRouterMiddleware = syncHistory(browserHistory);

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  reduxRouterMiddleware
)(createStore);

const store = createStoreWithMiddleware(combinedReducer);
const history = createHistory();

syncReduxAndRouter(history, store);

ReactDOM.render(
<Provider store={store} >
  <Router history={history}>
  { routes }
  </Router>
</Provider>,
  document.getElementById('root')
);

let unsubscribe = store.subscribe((state) =>
  console.log(store.getState())
);

unsubscribe();