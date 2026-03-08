import { createEffect } from 'effector';

export const accessTokenFx = createEffect((value: string) => localStorage.setItem('access_token', value));
