import { createRouteView } from 'atomic-router-react';
import { PageSpinner } from '@/widgets';
import { model } from './model';
import { UserPage } from './ui';

export const UserRoute = {
  view: createRouteView({ route: model.authorizedUserRoute, view: UserPage, otherwise: PageSpinner }),
  route: model.userRoute
};

export const ProfileRoute = {
  view: createRouteView({ route: model.authorizedProfileRoute, view: UserPage, otherwise: PageSpinner }),
  route: model.profileRoute
};
