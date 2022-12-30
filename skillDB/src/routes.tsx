import React from 'react';
import {Route} from './models/routes';

const HomePage = React.lazy(() => import('./homePage'));

const routes: Array<Route> = [
  {
    path: '/',
    element: <HomePage/>,
  },
];

export default routes;
