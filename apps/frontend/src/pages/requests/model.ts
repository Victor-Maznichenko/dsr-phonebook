import type { AccessRequestStatus } from '@/shared/lib';
import { chainRoute } from 'atomic-router';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { requests } from '@/shared/api';
import { routes } from '@/shared/config';

const $accessRequests = createStore<AccessRequestDto[]>([]);
const getAccessRequests = createEvent();
const getAccessRequestsFx = createEffect(requests.getAccessRequests);

sample({
  clock: getAccessRequests,
  target: getAccessRequestsFx
});

sample({
  clock: getAccessRequestsFx.doneData,
  fn: (response) => response.rows,
  target: $accessRequests
});

const route = routes.accessRequests;
const authorizedRoute = chainRoute({
  route,
  beforeOpen: getAccessRequests,
  openOn: getAccessRequestsFx.done,
  cancelOn: getAccessRequestsFx.fail
});

/* DELETE REQUEST */
const deleteAccessRequest = createEvent<number>();
const deleteAccessRequestFx = createEffect(requests.deleteAccessRequest);

sample({
  clock: deleteAccessRequest,
  target: deleteAccessRequestFx
});

sample({
  clock: deleteAccessRequestFx.doneData,
  source: $accessRequests,
  fn: (accessRequests, id) => accessRequests.filter((r) => r.id !== id),
  target: $accessRequests
});

/* CHANGE REQUEST */
const changeStatus = createEvent<{ id: number, status: AccessRequestStatus }>();
const changeAccessRequestFx = createEffect(requests.patchAccessRequest);

sample({
  clock: changeStatus,
  target: changeAccessRequestFx
});

sample({
  clock: changeAccessRequestFx.doneData,
  source: $accessRequests,
  fn: (accessRequests, changedRequest) => ({
    ...accessRequests.filter((r) => r.id !== changedRequest.id),
    changedRequest
  }),
  target: $accessRequests
});

export const model = {
  route,
  authorizedRoute,
  deleteAccessRequest,
  changeStatus,
  $accessRequests,
  $isLoading: getAccessRequestsFx.pending
};
