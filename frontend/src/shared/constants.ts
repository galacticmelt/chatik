export const API_ROUTES = {
  AUTH: `${import.meta.env.VITE_BASE_URL}/auth/`,
  REFRESH_ACCESS: `${import.meta.env.VITE_BASE_URL}/auth/refresh-access`,
  USERS: `${import.meta.env.VITE_BASE_URL}/users/`,
  CHATS_GET: `${import.meta.env.VITE_BASE_URL}/chats/getByUser/`,
  CHATS_POST: `${import.meta.env.VITE_BASE_URL}/chats/`,
  MESSAGES_GET: `${import.meta.env.VITE_BASE_URL}/messages/getByChat/`,
  MESSAGES_POST: `${import.meta.env.VITE_BASE_URL}/messages/`
};

export const DEFAULT_VALUES = {
  EMPTY_STRING: '',
  PHANTOM_CHAT_ID: '000000000000000000000000'
};
