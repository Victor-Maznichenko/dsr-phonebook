import { createEffect, createEvent, createStore, sample } from 'effector';
import { requests } from '@/shared/api';
import { appStarted } from '@/shared/config';
import { ROLES, setAccessTokenFx } from '@/shared/lib';

const getMe = createEvent();
const getMeFx = createEffect(requests.getMe);
const $me = createStore<Nullable<UserMe>>(null);
const $isAdmin = $me.map((me) => Boolean(me?.role === ROLES.Admin));
const $isDefault = $me.map((me) => Boolean(me?.role === ROLES.Default));

sample({
  clock: [setAccessTokenFx.done, appStarted],
  target: getMeFx
});

sample({
  clock: getMeFx.doneData,
  target: $me
});

sample({
  clock: getMe,
  target: getMeFx
});

export const model = {
  $me,
  $isAdmin,
  getMe,
  getMeFx,
  $isDefault
};
