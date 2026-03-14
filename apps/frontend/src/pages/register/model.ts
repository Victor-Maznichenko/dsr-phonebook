import { redirect } from 'atomic-router';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum';
import { requests } from '@/shared/api';
import { routes } from '@/shared/config';
import { setAccessTokenFx } from '@/shared/lib';

const route = routes.register;
const registerFx = createEffect(requests.postRegister);
const submitted = createEvent<RegisterDto>();
const $errorMessage = createStore('');

sample({
  clock: submitted,
  fn: (data) => ({
    avatar: null,
    personalPhones: [],
    officeAddress: '',
    birthday: '2005-08-01',
    ...data
  }),
  target: registerFx
});

sample({
  clock: registerFx.failData,
  fn: ({ message }) => message,
  target: $errorMessage
});

sample({
  clock: registerFx.doneData,
  target: setAccessTokenFx
});

redirect({
  clock: setAccessTokenFx.done,
  route: routes.home
});

// Reset values
reset({
  clock: submitted,
  target: $errorMessage
});

reset({
  clock: route.closed,
  target: $errorMessage
});

export const model = { route, $isLoading: registerFx.pending, $errorMessage, submitted };
