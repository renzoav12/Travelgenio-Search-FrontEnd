import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import SearchCardListContainer from '../containers/SearchCardList';
import SearchBoxContainer from '../containers/SearchBox';

const App = () => {
  return (
      <div className="container-fluid">
          
        <div className="row">
            <aside className="col-3">
                <SearchBoxContainer></SearchBoxContainer>
            </aside>

            <div className="col-9">
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/" exact component={SearchCardListContainer} />
                        <Route path="/results" exact component={SearchCardListContainer} />
                    </Switch>
                </div>
            </Router>
        </div>            
        </div>

      </div>
  );
};

export default App;