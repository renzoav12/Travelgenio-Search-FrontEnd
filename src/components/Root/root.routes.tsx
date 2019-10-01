import React from 'react'
import { Route } from 'react-router'

import {
  ROUTE_HOME,
  ROUTE_NOT_FOUND,
  ROUTE_SEARCH,
  ROUTE_SEARCH_RESULTS
} from './root.routes.constants'
import App from '../Search/Search'

const EmptyComponent = () => <div />

export const getRoutes = () => (
  <div>
    <Route path={ROUTE_SEARCH} component={App} />
  </div>
)
