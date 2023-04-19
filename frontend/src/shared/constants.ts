export const API_ROUTES = {
  AUTH: `${import.meta.env.VITE_BASE_URL}/auth/`,
  REFRESH_ACCESS: `${import.meta.env.VITE_BASE_URL}/auth/refresh-access`,
  USERS: `${import.meta.env.VITE_BASE_URL}/users/`,
  CHATS: `${import.meta.env.VITE_BASE_URL}/chats/getByUser/`,
  MESSAGES: `${import.meta.env.VITE_BASE_URL}/messages/getByChat/`,
  MESSAGES_POST: `${import.meta.env.VITE_BASE_URL}/messages/`
};
