import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './app/containers/App'
import Home from './app/views/index'

export default function getRoutes() {
  return (
    <div>
      <Route path="/" component={ App } >
        <IndexRoute component={ Home } />
      </Route>
    </div>
  )
}