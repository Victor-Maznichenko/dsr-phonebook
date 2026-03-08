import { api } from '../instance';

export const getProfile = () => api.get<UserDetailDto>('profile').json();
export const deleteProfile = () => api.delete('profile').json();
export const patchProfilePersonal = (body: PatchUserPersonal) => api.patch<PatchUserPersonal>('profile/personal', { json: body }).json();
export const patchProfileCredentials = (body: PatchUserPasswords) => api.patch('profile/credentials', { json: body }).json();
