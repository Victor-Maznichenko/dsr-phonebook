import type { RouteInstance, RouteParams, RouteParamsAndQuery } from 'atomic-router';
import { chainRoute } from 'atomic-router';
import { createEvent, sample } from 'effector';
import { selfModel } from './me';

export const chainAuthorized = <Params extends RouteParams>(route: RouteInstance<Params>) => {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const openRoute = createEvent();

  sample({
    clock: sessionCheckStarted,
    target: selfModel.getMeFx
  });

  sample({
    clock: selfModel.getMeFx.done,
    target: openRoute
  });

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: openRoute
  });
};
