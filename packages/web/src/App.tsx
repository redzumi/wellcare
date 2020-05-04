import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setUIMedia } from 'store/ui';
import { useStore } from 'effector-react';
import { ROUTES } from 'router';

import Page from 'common/page';
import Error from 'common/page/error/Error';
import Login from 'modules/login';

import { $session, checkSession } from 'store/session';

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
  const session = useStore($session);

  return (
    <Router>
      <Page>
        <Switch>
          {!session.token && <Route exact component={Login} />}
          {ROUTES.map((route) => (
            <Route
              exact
              key={route.pathname}
              path={route.pathname}
              component={route.module}
            />
          ))}
          <Route exact component={Error} />
        </Switch>
      </Page>
    </Router>
  );
};

registerResizeListener();
checkSession();

export default App;
