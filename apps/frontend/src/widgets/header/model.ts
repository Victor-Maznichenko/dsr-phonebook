import { redirect } from 'atomic-router';
import { createEffect, createEvent, sample } from 'effector';
import { requests } from '@/shared/api';
import { routes } from '@/shared/config';
import { deleteAccessTokenFx } from '@/shared/lib';

const logout = createEvent();
const logoutFx = createEffect(requests.postLogout);

sample({
  clock: logout,
  target: logoutFx
});

sample({
  clock: logoutFx.done,
  target: deleteAccessTokenFx
});

redirect({
  clock: deleteAccessTokenFx.done,
  route: routes.login
});

export const model = { logout };
