import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { ROUTES } from '../../Config/routes';
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

function App() {
  return (
    <div className="container-fluid">
         <Router history={history}>
          <Switch >
            {ROUTES.map((route, i) =>
              <Route key={i} path={route.path} component={route.component} exact={true} />
            )}
          </Switch>
        </Router>
    </div>
  );
}

export default App;
