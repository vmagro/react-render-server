import React from 'react'
import { Route, Switch } from 'react-router'

import Index from './components/index'
import Hello from './components/hello'
import NotFound from './components/404'
import Gql from './components/gql'

export default (
  <Switch>
    <Route exact path='/' component={Index} />
    <Route path='/index' component={Index} />
    <Route path='/hello' component={Hello} />
    <Route path='/gql' component={Gql} />
    <Route component={NotFound} />
  </Switch>
);
