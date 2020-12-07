import * as React from 'react';
import { Route } from 'react-router-dom';
import Configuration from '../pages/Configuration/Configuration';

export default [
  <Route exact path="/configuration" render={() => <Configuration />} />,
];
