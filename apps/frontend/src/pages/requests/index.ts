import { createRouteView } from 'atomic-router-react';
// import { Spinner } from '@/shared/ui';
import { model } from './model';
import { RequestsPage } from './ui';

export const RequestsRoute = {
  view: createRouteView({ route: model.authorizedRoute, view: RequestsPage }),
  route: model.route
};
