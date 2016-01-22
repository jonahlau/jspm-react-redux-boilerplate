import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'redux-simple-router'
import getRoutes from './routes.js'

import reducers from './redux/reducers'

//combine reducers
let combinedReducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));

const loggerMiddleware = createLogger();

const reduxRouterMiddleware = syncHistory(browserHistory);


const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware,
  reduxRouterMiddleware
)(createStore);

const store = createStoreWithMiddleware(combinedReducer);

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store);

//Helper component to force rerender on hot reload
//Reference: https://github.com/capaj/systemjs-hot-reloader/issues/13

class RenderForcer extends React.Component {
  constructor() {
    super()
  }

  componentWillMount() {
    this.forceUpdate(); // a little hack to help us rerender when this module is reloaded
  }

  render() {
    return (
      <Provider store={store} >
        <Router history={browserHistory}>
          { getRoutes() }
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(
  <RenderForcer />,
  document.getElementById('root')
);


console.log(store.getState());