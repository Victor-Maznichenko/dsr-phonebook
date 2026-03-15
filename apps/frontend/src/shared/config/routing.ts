import { createHistoryRouter, createRoute, createRouterControls, redirect } from 'atomic-router';
import { sample } from 'effector';
import { createBrowserHistory } from 'history';
import { appStarted } from '@/shared/config/init';
import { requestForbidden, requestUnauthorized } from '../api/instance';

/* Обьявляем константу с роутами которые будем использовать во всем приложении */

export const routes = {
  user: createRoute<{ userId?: string }>(),
  home: createRoute(),
  login: createRoute(),
  profile: createRoute(),
  loginAdmin: createRoute(),
  register: createRoute(),
  accessRequests: createRoute(),
  notFound: createRoute()
};

/* Создаем элементы управления, историю роутера */
export const controls = createRouterControls();
export const router = createHistoryRouter({
  routes: [
    {
      path: '/profile',
      route: routes.profile
    },
    {
      path: '/users/:userId',
      route: routes.user
    },
    {
      path: '/',
      route: routes.home
    },
    {
      path: '/login',
      route: routes.login
    },
    {
      path: '/admin/login',
      route: routes.loginAdmin
    },
    {
      path: '/admin/access-requests',
      route: routes.accessRequests
    },
    {
      path: '/register',
      route: routes.register
    }
  ],
  notFoundRoute: routes.notFound,
  controls
});

/* Создаем объект history при инициализации приложения */
sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory
});

/* Redirect auth logic */
redirect({
  clock: requestUnauthorized,
  route: routes.login
});

redirect({
  clock: requestForbidden,
  route: routes.loginAdmin
});
