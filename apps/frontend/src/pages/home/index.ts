import { createRouteView } from 'atomic-router-react';
// import { Spinner } from '@/shared/ui';
import { model } from './model';
import { HomePage } from './ui';

export const HomeRoute = {
  view: createRouteView({ route: model.authorizedRoute, view: HomePage }),
  route: model.route
};
