import ky from 'ky';
import { authAdminRedirect, authRedirect } from '../config';

const BASE_URL = import.meta.env.VITE_API_BASE;

export const api = ky.create({
  prefixUrl: BASE_URL,
  timeout: 60000,
  retry: 0,
  hooks: {
    beforeRequest: [
      async (request) => {
        const accessToken = localStorage.getItem('access_token');
        request.headers.set('Authorization', `Bearer ${accessToken}`);
        request.headers.set('cache', 'no-store');
      }
    ],
    afterResponse: [
      // Недостаточно прав
      (_input, _options, response) => {
        if (response.status === 403) {
          authAdminRedirect();
        }
      },
      // Не аутентифицирован
      async (request, _options, response) => {
        if (response.status === 401) {
          try {
            const newAccessToken = await ky.post(`${BASE_URL}/auth/refresh`, { credentials: 'include' }).text();

            if (newAccessToken) {
              localStorage.setItem('access_token', newAccessToken);
              request.headers.set('Authorization', `Bearer ${newAccessToken}`);
              return ky(request);
            }
          } catch {
            localStorage.removeItem('access_token');
            authRedirect();
          }
        }
      }
    ]
  }
});
