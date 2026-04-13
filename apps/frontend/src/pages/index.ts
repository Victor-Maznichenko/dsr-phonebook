import { createRoutesView } from 'atomic-router-react';
import { HomeRoute } from './home';
import { LoginAdminRoute, LoginRoute } from './login';
import { NotFoundRoute } from './not-found';
import { RegisterRoute } from './register';
import { RequestsRoute } from './requests';
import { ProfileRoute, UserRoute } from './user';

export const Pages = createRoutesView({
  routes: [HomeRoute, LoginRoute, LoginAdminRoute, RegisterRoute, UserRoute, ProfileRoute, RequestsRoute, NotFoundRoute]
});
