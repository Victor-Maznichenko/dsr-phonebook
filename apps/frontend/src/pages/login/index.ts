import { model } from './model';
import { LoginPage } from './ui';

export const LoginRoute = {
  view: LoginPage,
  route: model.route
};

export const LoginAdminRoute = {
  view: LoginPage,
  route: model.adminRoute
};
