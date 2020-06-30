import React from "react";
import { Route, Switch, Redirect } from "react-router";

import { ROUTE_SEARCH, ROUTE_SEARCH_RESULTS, ROUTE_OLD_SEARCH_RESULTS } from "./root.routes.constants";
import SearchContainer from "../../containers/Search/SearchContainer";

const homeUrl = window.location.protocol+"//"+window.location.host + "/hotels/home/";

export const getRoutes = () => (
  <div>
    <Switch>
      <Route exact path={ROUTE_SEARCH_RESULTS} component={SearchContainer} />
      <Route exact path={ROUTE_OLD_SEARCH_RESULTS} component={SearchContainer} />
      <Route path={ROUTE_SEARCH} render={() => {window.location.href = homeUrl; return null;}}/>
    </Switch>
  </div>
);
