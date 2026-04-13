import { createEffect, createStore, sample } from 'effector';
import { requests } from '@/shared/api';
import { routes } from '@/shared/config';
import { chainAuthorized } from '@/shared/session';

const route = routes.home;
const authorizedRoute = chainAuthorized(route);

const $users = createStore<UserCompactDto[]>([]);
const getUsersFx = createEffect(requests.getUsers);

sample({
  clock: routes.home.opened,
  fn: () => undefined,
  target: getUsersFx
});

sample({
  clock: getUsersFx.doneData,
  target: $users
});

export const model = { route, authorizedRoute, $users, $isLoading: getUsersFx.pending };
