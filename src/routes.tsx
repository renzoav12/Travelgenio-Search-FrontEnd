import React from 'react'
import { Route } from 'react-router'

import {
  ROUTE_HOME,
  ROUTE_NOT_FOUND,
  ROUTE_SEARCH,
  ROUTE_SEARCH_RESULTS
} from './routes.constants'
import Search from './components/Search/Search'

const EmptyComponent = () => <div />

export const getRoutes = () => (
  <div>
    <Route component={Search} path={ROUTE_SEARCH} />
  </div>
)
