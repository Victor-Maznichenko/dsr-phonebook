import { createEffect, createStore, sample } from 'effector';
import { requests } from '../../api';
import { appStarted } from '../../config';

export const setAccessTokenFx = createEffect((value: string) => localStorage.setItem('access_token', value));
export const deleteAccessTokenFx = createEffect(() => localStorage.removeItem('access_token'));

const getMeFx = createEffect(requests.getMe);
export const $me = createStore<Nullable<UserMe>>(null);

sample({
  clock: [setAccessTokenFx.done, appStarted],
  target: getMeFx
});

sample({
  clock: getMeFx.doneData,
  target: $me
});
