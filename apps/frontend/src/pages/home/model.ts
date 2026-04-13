import { createEffect, createStore, sample } from 'effector';
import { requests } from '@/shared/api';
import { routes } from '@/shared/config';
import { chainAuthorized } from '@/shared/session';
import { toast } from '@/shared/ui';

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

getUsersFx.fail.watch(() => {
  toast.add({
    title: 'Ошибка',
    message: 'Не удалось загрузить список пользователей. Попробуйте позже.',
    variant: 'error'
  });
});

export const model = { route, authorizedRoute, $users, $isLoading: getUsersFx.pending };
