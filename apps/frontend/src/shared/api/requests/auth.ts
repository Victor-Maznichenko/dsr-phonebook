import { api } from '../instance';

export const postAdminLogin = (userData: LoginDto) => api.post<string>('admin/auth/login', { json: userData });
export const postRegister = (userData: RegisterDto) => api.post<string>('auth/register', { json: userData });
export const postLogin = (userData: LoginDto) => api.post<string>('auth/login', { json: userData });
