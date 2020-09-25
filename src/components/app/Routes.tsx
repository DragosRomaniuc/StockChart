import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { RoutePath } from '../../config/route-config';
import { Stocks } from 'components/stocks/Stocks';

export const routesTestId = 'RoutesComponent';

export const Routes = () => (
  <div data-testid={routesTestId}>
    <Switch>
      <Route exact path={RoutePath.Index}>
        <Stocks/>
      </Route>

      <Route path={RoutePath.Index}>
        <Redirect to={RoutePath.Index}/>
      </Route>
    </Switch>
  </div>
);
