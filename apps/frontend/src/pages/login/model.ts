import { createEffect, createEvent, createStore, sample } from 'effector';
import { requests } from '@/shared/api';

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

export const model = { $isLoading: loginFx.pending, $isIncorrectData, submited };
