import { redirect } from 'atomic-router';
import { attach, createEffect, createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum';
import { requests } from '@/shared/api';
import { routes } from '@/shared/config';
import { setAccessTokenFx } from '@/shared/lib';

const route = routes.login;
const adminRoute = routes.loginAdmin;
const $isAdminRouteOpened = adminRoute.$isOpened;
const submited = createEvent<LoginDto>();
const $isIncorrectData = createStore(false);

const loginMapParams = (body: LoginDto, isAdminRouteOpened: boolean) => ({ body, isAdminRouteOpened });
const loginFx = attach({
  source: $isAdminRouteOpened,
  mapParams: loginMapParams,
  effect: createEffect(async ({ isAdminRouteOpened, body }: ReturnType<typeof loginMapParams>) => {
    if (isAdminRouteOpened) {
      return await requests.postAdminLogin(body);
    }
    return await requests.postLogin(body);
  })
});

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
  clock: route.closed,
  target: $isIncorrectData
});

export const model = {
  route,
  adminRoute,
  $isAdminRouteOpened,
  $isLoading: loginFx.pending,
  $isIncorrectData,
  submited
};
