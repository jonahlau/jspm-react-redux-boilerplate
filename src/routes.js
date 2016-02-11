import React from 'react';
import { Route, IndexRoute } from 'react-router';;
import App from './app/containers/App';
import { Home, Login } from './app/views/index';

import requireAuthentication from './app/auth/AuthenticatedComponent';

export default function getRoutes() {
  return (
    <div>
      <Route path="/login" component={ Login } />
      <Route path="/" component={ App } >
        <Route path="protected" component={ requireAuthentication(Home) } />
        <IndexRoute component={ Home } />
      </Route>
    </div>
  );
}
