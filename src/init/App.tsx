import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import AccommodationRateSearch from '../containers/AccommodationRateSearch';

const App = () => {
  return (
      <div className="ui container">
          <Router history={history}>
              <div>
                  <Switch>
                      <Route path="/" exact component={AccommodationRateSearch} />
                      <Route path="/results" exact component={AccommodationRateSearch} />
                 </Switch>
              </div>
          </Router>
      </div>
  );
};

export default App;