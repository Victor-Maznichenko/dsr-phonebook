import { api } from '../instance';

interface GetUsersParams {
  offset?: number;
  limit?: number;
}

export const getUsers = ({ limit = 10, offset = 0 }: GetUsersParams = {}) =>
  api.get<UserCompactDto[]>('users', {
    searchParams: {
      limit,
      offset
    }
  });

export const getUserById = (id: string) => api.get<UserDetailDto>(`users/${id}`);
export const deleteUserById = (id: string) => api.delete(`users/${id}`);
