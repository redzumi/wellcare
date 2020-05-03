import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Hello from 'modules/hello';

const App = () => (
  <Router>
      <Switch>
        <Route path="/">
          <Hello />
        </Route>
      </Switch>
  </Router>
);

export default App;
