import React from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import {history} from '../../history';
import { getRoutes } from './root.routes';
import { ConnectedRouter } from 'connected-react-router';

const Root = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>{getRoutes()}</ConnectedRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;