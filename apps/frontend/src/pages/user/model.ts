import type { ModalType } from './lib';
import { redirect } from 'atomic-router';
import { attach, createEffect, createEvent, createStore, sample } from 'effector';
import { not, or, reset } from 'patronum';
import { requests } from '@/shared/api';
import { routes } from '@/shared/config';
import { $isAdmin, $me, deleteAccessTokenFx } from '@/shared/lib';

/*
===================
Общее
===================
*/
const closeModal = createEvent();
const setModal = createEvent<string>();
const $currentModal = createStore<Nullable<ModalType>>(null)
  .on(setModal, (_, modalName) => modalName)
  .reset(closeModal);

// Submited events
const submited = {
  credentials: createEvent<PatchUserPasswords>(),
  personal: createEvent<PatchUserPersonal>()
};

// Get user id
const $userId = createStore<Nullable<number>>(null);
const $havePremissions = or(not($userId), $isAdmin);

sample({
  clock: routes.user.opened,
  fn: (route) => Number(route.params.userId),
  target: $userId
});

$userId.reset(routes.profile.opened);

/*
===================
Получение пользователя
===================
*/
const $user = createStore<Nullable<UserDetailDto>>(null);

const getUserFx = attach({
  source: $userId,
  mapParams: (_, userId) => ({ userId }),
  effect: createEffect(async (params: { userId: Nullable<number> }) => {
    if (params.userId) {
      return await requests.getUserById(String(params.userId));
    }
    return await requests.getProfile();
  })
});

sample({
  clock: [routes.user.opened, routes.profile.opened],
  fn: () => undefined,
  target: getUserFx
});

sample({
  clock: getUserFx.doneData,
  target: $user
});

/*
===================
Удаление пользователя
===================
*/
const userDeleted = createEvent();

const deleteUserFx = attach({
  source: $userId,
  mapParams: (_, userId) => ({ userId }),
  effect: createEffect(async (params: { userId: Nullable<number> }) => {
    if (params.userId) {
      return await requests.deleteUserById(String(params.userId));
    }
    return await requests.deleteProfile();
  })
});

sample({
  clock: userDeleted,
  target: deleteUserFx
});

sample({
  clock: deleteUserFx.done,
  target: deleteAccessTokenFx
});

/*
===================
Изменение личных данных пользователя
===================
*/
const patchPersonalMapParams = (body: PatchUserPersonal, userId: Nullable<number>) => ({ body, userId });
const patchPersonalFx = attach({
  source: $userId,
  mapParams: patchPersonalMapParams,
  effect: createEffect(async (params: ReturnType<typeof patchPersonalMapParams>) => {
    if (params.userId) {
      return await requests.patchUserPersonal(String(params.userId), params.body);
    }
    return await requests.patchProfilePersonal(params.body);
  })
});

sample({
  clock: submited.personal,
  target: patchPersonalFx
});

sample({
  clock: patchPersonalFx.doneData,
  source: $user,
  fn: (oldUser, newValues) => ({ ...oldUser, ...newValues }) as UserDetailDto,
  target: [$user, closeModal]
});

/*
===================
Изменение пароля
===================
*/
const patchCredentialsMapParams = (body: PatchUserPasswords, userId: Nullable<number>) => ({ body, userId });
const patchCredentialsFx = attach({
  source: $userId,
  mapParams: patchCredentialsMapParams,
  effect: createEffect(async (params: ReturnType<typeof patchCredentialsMapParams>) => {
    if (params.userId) {
      console.error(new Error('Not allowed change another user credentials'));
    }
    return await requests.patchProfileCredentials(params.body);
  })
});

sample({
  clock: patchCredentialsFx.done,
  target: closeModal
});

sample({
  clock: submited.credentials,
  target: patchCredentialsFx
});

// Сброс значений
reset({
  clock: [routes.user.closed, routes.profile.closed],
  target: [$user, $userId]
});

// Loading states
const $isLoading = {
  getUser: getUserFx.pending,
  patchPersonal: patchPersonalFx.pending,
  patchCredentials: patchCredentialsFx.pending
};

redirect({
  clock: sample({
    clock: routes.user.opened,
    source: $me,
    filter: (me, route) => me?.id === Number(route.params.userId)
  }),
  route: routes.profile
});

export const model = {
  $currentModal,
  $isLoading,
  $user,
  setModal,
  closeModal,
  patchPersonalFx,
  patchCredentialsFx,
  submited,
  userDeleted,
  $havePremissions
};
