import { api } from '../instance';

export const getMe = async () => await api.get<UserMe>('auth/me').json();
export const postAdminLogin = async (userData: LoginDto) => await api.post<string>('auth/admin/login', { json: userData }).text();
export const postRegister = async (userData: RegisterDto) => await api.post<string>('auth/register', { json: userData }).text();
export const postLogin = async (userData: LoginDto) => await api.post<string>('auth/login', { json: userData }).text();
export const postLogout = async () => await api.post<string>('auth/logout').text();
