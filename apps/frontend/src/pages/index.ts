import { createRoutesView } from 'atomic-router-react';
import { HomeRoute } from './home';
import { LoginRoute } from './login';
import { RegisterRoute } from './register';
import { ProfileRoute, UserRoute } from './user';

export const Pages = createRoutesView({
  routes: [HomeRoute, LoginRoute, RegisterRoute, UserRoute, ProfileRoute]
});
