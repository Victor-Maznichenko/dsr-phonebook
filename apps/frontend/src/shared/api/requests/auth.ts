import { api } from '../instance';

export const postAdminLogin = async (userData: LoginDto) => api.post<string>('admin/auth/login', { json: userData }).text();
export const postRegister = async (userData: RegisterDto) => api.post<string>('auth/register', { json: userData }).text();
export const postLogin = async (userData: LoginDto) => api.post<string>('auth/login', { json: userData }).text();
