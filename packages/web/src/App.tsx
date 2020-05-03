import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { setUIMedia } from 'store/ui';
import Hello from 'modules/hello';

const MOBILE_BREAKPOINT = 920;

const getCurrentMedia = () =>
  window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`).matches
    ? UIMedia.Desktop
    : UIMedia.Mobile;

const registerResizeListener = () => {
  setUIMedia(getCurrentMedia()); // for first client load

  window.addEventListener('resize', () => {
    setUIMedia(getCurrentMedia());
  });
};

const App = () => (
  <Router>
    <Switch>
      <Route path="/">
        <Hello />
      </Route>
    </Switch>
  </Router>
);

registerResizeListener();

export default App;
