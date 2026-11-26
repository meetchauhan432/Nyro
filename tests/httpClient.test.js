import test from 'node:test';
import assert from 'node:assert/strict';
import { createHttpClient, ApiError } from '../src/shared/api/httpClient.js';

const json = (value, status = 200) => new Response(JSON.stringify(value), { status, headers: { 'content-type': 'application/json' } });

test('request uses configured prefix, query, JSON headers and explicit credentials', async () => {
  let captured;
  const client = createHttpClient({ baseUrl: 'https://example.invalid/api/v1', credentials: 'include', getHeaders: () => ({ 'X-Test': 'test' }), fetchImpl: async (url, options) => { captured = { url, options }; return json({ data: [] }); } });
  assert.deepEqual(await client.request('sample', { method: 'POST', query: { page: 2 }, body: { name: 'Demo' } }), { data: [] });
  assert.equal(captured.url.href, 'https://example.invalid/api/v1/sample?page=2');
  assert.equal(captured.options.headers.get('accept'), 'application/json');
  assert.equal(captured.options.headers.get('content-type'), 'application/json');
  assert.equal(captured.options.headers.get('x-test'), 'test');
  assert.equal(captured.options.credentials, 'include');
  assert.deepEqual(JSON.parse(captured.options.body), { name: 'Demo' });
});

test('Laravel-shaped validation errors preserve status and field errors', async () => {
  const client = createHttpClient({ baseUrl: 'https://example.invalid/api', fetchImpl: async () => json({ message: 'Validation failed', errors: { name: ['Required'] } }, 422) });
  await assert.rejects(client.request('sample'), error => error instanceof ApiError && error.status === 422 && error.errors.name[0] === 'Required');
});

test('unconfigured and escaping endpoints never issue network requests', async () => {
  const fail = async () => { assert.fail('Unexpected network request'); };
  await assert.rejects(createHttpClient({ fetchImpl: fail }).request('sample'), /not been configured/);
  const client = createHttpClient({ baseUrl: 'https://example.invalid/api', fetchImpl: fail });
  for (const endpoint of ['../escape', 'https://other.invalid/test', '//other.invalid/test']) await assert.rejects(client.request(endpoint), ApiError);
});

test('handles empty, unauthorized, HTML and network responses without false success', async () => {
  for (const [response, status] of [[json({}, 401), 401], [new Response('<html>login</html>', { headers: { 'content-type': 'text/html' } }), 200]]) {
    const client = createHttpClient({ baseUrl: 'https://example.invalid/api', fetchImpl: async () => response });
    await assert.rejects(client.request('sample'), error => error.status === status);
  }
  const noContent = createHttpClient({ baseUrl: 'https://example.invalid/api', fetchImpl: async () => new Response(null, { status: 204 }) });
  assert.equal(await noContent.request('sample'), null);
  const offline = createHttpClient({ baseUrl: 'https://example.invalid/api', fetchImpl: async () => { throw new Error('offline'); } });
  await assert.rejects(offline.request('sample'), /Unable to reach/);
});
