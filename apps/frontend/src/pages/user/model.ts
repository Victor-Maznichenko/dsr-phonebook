import type { ModalType } from './lib';
import { redirect } from 'atomic-router';
import { attach, combine, createEffect, createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum';
import { requests } from '@/shared/api';
import { routes } from '@/shared/config';
import { $me, deleteAccessTokenFx } from '@/shared/lib';
import { chainAuthorized, selfModel } from '@/shared/session';

/*
===================
Общее
===================
*/
const userRoute = routes.user;
const profileRoute = routes.profile;
const authorizedUserRoute = chainAuthorized(userRoute);
const authorizedProfileRoute = chainAuthorized(profileRoute);

const closeModal = createEvent();
const setModal = createEvent<Nullable<ModalType>>();
const $currentModal = createStore<Nullable<ModalType>>(null)
  .on(setModal, (_, modalName) => modalName)
  .reset(closeModal);

// Submitted events
const submitted = {
  credentials: createEvent<PatchUserPasswords>(),
  personal: createEvent<PatchUserPersonal>()
};

/*
===================
User id & permissions
===================
*/
const $userId = createStore<number | null>(null);
$userId.reset(profileRoute.opened);

sample({
  clock: userRoute.opened,
  fn: (route) => Number(route.params.userId),
  target: $userId
});

const $hasPermissions = combine($userId, selfModel.$isAdmin, (userId, isAdmin) => userId === null || isAdmin);

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
  clock: [userRoute.opened, profileRoute.opened],
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
  clock: submitted.personal,
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
      throw new Error('Changing another user credentials is not allowed.');
    }
    return await requests.patchProfileCredentials(params.body);
  })
});

sample({
  clock: patchCredentialsFx.done,
  target: closeModal
});

sample({
  clock: submitted.credentials,
  target: patchCredentialsFx
});

/*
===================
Сброс значений
===================
*/
reset({
  clock: [userRoute.closed, profileRoute.closed],
  target: [$user, $userId]
});

/*
===================
Loading states
===================
*/
const $isLoading = {
  getUser: getUserFx.pending,
  patchPersonal: patchPersonalFx.pending,
  patchCredentials: patchCredentialsFx.pending
};

/*
===================
Redirect: если открыли /user/:id и это мой профиль — редиректим на profile
===================
*/
redirect({
  clock: sample({
    clock: userRoute.opened,
    source: $me,
    filter: (me, route) => me?.id === Number(route.params.userId)
  }),
  route: profileRoute
});

/*
===================
Экспорт модели
===================
*/
export const model = {
  userRoute,
  profileRoute,
  authorizedUserRoute,
  authorizedProfileRoute,
  $currentModal,
  $isLoading,
  $user,
  setModal,
  closeModal,
  patchPersonalFx,
  patchCredentialsFx,
  submitted,
  userDeleted,
  $hasPermissions
};
