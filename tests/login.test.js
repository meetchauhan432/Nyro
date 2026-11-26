import assert from 'node:assert/strict';
import test from 'node:test';
import { validateLogin } from '../src/features/auth/domain/loginRules.js';
import { demoCredentials, matchesDemoCredentials } from '../src/features/auth/services/demoAuthService.js';

test('login checks both fields and requires a 10-digit mobile number', () => {
  assert.deepEqual(Object.keys(validateLogin({ mobile: '', password: '' })), ['mobile', 'password']);
  for (const mobile of ['900000000', '90000000001', 'name@example.com', '+919000000000']) {
    assert.deepEqual(Object.keys(validateLogin({ mobile, password: demoCredentials.password })), ['mobile']);
  }
  assert.deepEqual(validateLogin({ ...demoCredentials, mobile: ' 9000000000 ' }), {});
});

test('demo authentication checks both credentials and preserves password case and whitespace', () => {
  assert.equal(matchesDemoCredentials(demoCredentials), true);
  assert.equal(matchesDemoCredentials({ ...demoCredentials, mobile: ' 9000000000 ' }), true);
  assert.equal(matchesDemoCredentials({ ...demoCredentials, mobile: '9000000001' }), false);
  assert.equal(matchesDemoCredentials({ ...demoCredentials, password: 'nyrodemo!' }), false);
  assert.equal(matchesDemoCredentials({ ...demoCredentials, password: 'NyroDemo! ' }), false);
});