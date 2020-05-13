import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { history } from "../../history";
import { getRoutes } from "./root.routes";
import { ConnectedRouter } from "connected-react-router";
import I18n from "redux-i18n";

const Root = ({ store }) => (
  <Provider store={store}>
    <I18n translations={{}} useReducer={true}>
      <ConnectedRouter history={history}>{getRoutes()}</ConnectedRouter>
    </I18n>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
