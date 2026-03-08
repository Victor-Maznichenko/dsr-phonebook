import { createHistoryRouter, createRoute, createRouterControls, redirect } from 'atomic-router';
import { createEvent, sample } from 'effector';
import { createBrowserHistory } from 'history';
import { appStarted } from '@/shared/config/init';

/* Обьявляем константу с роутами которые будем использовать во всем приложении */

export const routes = {
  user: createRoute<{ userId: string }>(),
  home: createRoute(),
  login: createRoute(),
  profile: createRoute(),
  loginAdmin: createRoute(),
  register: createRoute(),
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
export const authRedirect = createEvent();
export const authAdminRedirect = createEvent();

redirect({
  clock: authRedirect,
  route: routes.login
});

redirect({
  clock: authAdminRedirect,
  route: routes.loginAdmin
});
