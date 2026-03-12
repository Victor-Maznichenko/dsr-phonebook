import { createEffect, createStore, sample } from 'effector';
import { requests } from '@/shared/api';
import { routes } from '@/shared/config';

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

export const model = { $users, $isLoading: getUsersFx.pending };
