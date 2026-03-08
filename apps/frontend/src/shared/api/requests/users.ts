import { api } from '../instance';

interface GetUsersParams {
  offset?: number;
  limit?: number;
}

export const getUsers = async ({ limit = 10, offset = 0 }: GetUsersParams = {}) =>
  api.get<UserCompactDto[]>('users', {
    searchParams: {
      limit,
      offset
    }
  }).json();

export const getUserById = (id: string) => api.get<UserDetailDto>(`users/${id}`).json();
export const deleteUserById = (id: string) => api.delete(`users/${id}`).json();
export const patchUserPersonal = (id: string, body: PatchUserPersonal) => api.patch<PatchUserPersonal>(`users/${id}`, { json: body }).json();
