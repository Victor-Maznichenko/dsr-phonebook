import { redirect } from 'atomic-router';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum';
import { requests } from '@/shared/api';
import { routes } from '@/shared/config';
import { setAccessTokenFx } from '@/shared/lib';

const loginFx = createEffect(requests.postLogin);
const submited = createEvent<LoginDto>();
const $isIncorrectData = createStore(false);

sample({
  clock: submited,
  target: loginFx
});

sample({
  clock: submited,
  fn: () => false,
  target: $isIncorrectData
});

sample({
  clock: loginFx.fail,
  fn: () => true,
  target: $isIncorrectData
});

sample({
  clock: loginFx.doneData,
  target: setAccessTokenFx
});

redirect({
  clock: setAccessTokenFx.done,
  route: routes.home
});

// Reset values
reset({
  clock: routes.login.closed,
  target: $isIncorrectData
});

export const model = { $isLoading: loginFx.pending, $isIncorrectData, submited };
