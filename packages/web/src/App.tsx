import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setUIMedia } from 'store/ui';
import { ROUTES } from 'routes';
import Page from 'common/page';

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

const App = () => {
  return (
    <Router>
      <Switch>
        <Page>
          {ROUTES.map((route) => (
            <Route
              exact
              key={route.pathname}
              path={route.pathname}
              component={route.module}
            />
          ))}
        </Page>
      </Switch>
    </Router>
  );
};

registerResizeListener();

export default App;
