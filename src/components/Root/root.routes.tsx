import React from "react";
import { Route, Switch } from "react-router";

import { ROUTE_SEARCH, ROUTE_SEARCH_RESULTS, ROUTE_OLD_SEARCH_RESULTS } from "./root.routes.constants";
import SearchContainer from "../../containers/Search/SearchContainer";

export const getRoutes = () => (
  <div>
    <Switch>
      <Route exact path={ROUTE_SEARCH} component={SearchContainer} />
      <Route exact path={ROUTE_SEARCH_RESULTS} component={SearchContainer} />
      <Route exact path={ROUTE_OLD_SEARCH_RESULTS} component={SearchContainer} />
    </Switch>
  </div>
);
