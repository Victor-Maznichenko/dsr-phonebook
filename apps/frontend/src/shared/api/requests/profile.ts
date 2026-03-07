import { api } from '../instance';

export const getProfile = () => api.get<UserDetailDto>('profile');
export const deleteProfile = () => api.delete('profile');
