import React from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import history from '../../history';
import { getRoutes } from './root.routes';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>{getRoutes()}</Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;