import { createHttpClient } from './httpClient.js';

// Integrate only after Laravel's API prefix and auth/CSRF contract are approved.
// No module calls this client in demo mode. Do not store payment secrets in VITE_* variables.
export const apiClient = createHttpClient({ baseUrl: import.meta.env.VITE_API_BASE_URL });
