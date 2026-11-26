/**
 * Laravel-ready JSON transport. Deliberately not connected to the demo.
 * Endpoint paths and auth strategy must come from approved API documentation.
 */
export class ApiError extends Error {
  constructor(message, { status = 0, errors = {}, cause } = {}) {
    super(message, { cause });
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

export function createHttpClient({ baseUrl, fetchImpl = globalThis.fetch, getHeaders = () => ({}), credentials = 'same-origin' } = {}) {
  async function request(endpoint, { method = 'GET', body, query, signal, headers = {} } = {}) {
    if (!baseUrl) throw new ApiError('API base URL has not been configured.');
    if (typeof endpoint !== 'string' || !endpoint.trim() || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(endpoint) || endpoint.includes('\\')) {
      throw new ApiError('Use an approved relative API endpoint.');
    }
    const base = new URL(`${baseUrl.replace(/\/+$/, '')}/`, globalThis.location?.origin);
    const url = new URL(endpoint.replace(/^\/+/, ''), base);
    if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) {
      throw new ApiError('API endpoint must stay within the configured base URL.');
    }
    for (const [key, value] of Object.entries(query || {})) {
      if (value !== null && value !== undefined) url.searchParams.set(key, String(value));
    }
    const requestHeaders = new Headers({ Accept: 'application/json', ...await getHeaders(), ...headers });
    const isForm = typeof FormData !== 'undefined' && body instanceof FormData;
    let payload = body;
    if (body !== undefined && !isForm) {
      requestHeaders.set('Content-Type', 'application/json');
      payload = JSON.stringify(body);
    }
    let response;
    try {
      response = await fetchImpl(url, { method, headers: requestHeaders, body: payload, signal, credentials });
    } catch (cause) {
      if (cause?.name === 'AbortError') throw cause;
      throw new ApiError('Unable to reach the API.', { cause });
    }
    const isJson = response.headers.get('content-type')?.includes('json');
    let data = null;
    if (isJson && response.status !== 204) {
      try {
        data = await response.json();
      }
      catch (cause) {
        throw new ApiError('Invalid JSON response.', { status: response.status, cause });
      }
    }
    if (!response.ok) {
      throw new ApiError(typeof data?.message === 'string' ? data.message : `Request failed (${response.status}).`, {
        status: response.status,
        errors: response.status === 422 && data?.errors && typeof data.errors === 'object' ? data.errors : {},
      });
    }
    if (!isJson && response.status !== 204) throw new ApiError('Expected a JSON API response.', { status: response.status });
    return data;
  }
  return { request };
}
