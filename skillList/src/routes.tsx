import React from 'react';
import {Route} from './models/routes';

const AboutPage = React.lazy(() => import('./aboutPage'));

const routes: Array<Route> = [
  {
    path: '/about',
    element: <AboutPage/>,
  },
];

export default routes;
