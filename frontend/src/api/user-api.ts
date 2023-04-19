import ky, { HTTPError } from 'ky';
import { API_ROUTES } from '../shared/constants';
import { refreshAccess } from './auth-api';

export const fetchUserById = async (id: string) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const accessToken = sessionStorage.getItem('accessToken');
    const data = await ky
      .get(API_ROUTES.USERS + id, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        retry: {
          statusCodes: [401],
          limit: 5
        },
        hooks: {
          beforeRetry: [
            async ({ request, options, error, retryCount }) => {
              const newToken = await refreshAccess();
              request.headers.set('Authorization', `Bearer ${newToken}`);
            }
          ]
        }
      })
      .json();
    return data;
  } catch (err: unknown) {
    if (err instanceof HTTPError) {
      const jsonErr = await err.response.json();
      throw jsonErr;
    }
  }
};
