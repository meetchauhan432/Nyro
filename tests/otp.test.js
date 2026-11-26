import assert from 'node:assert/strict';
import test from 'node:test';
import { authFlow, createAuthState } from '../src/features/auth/domain/authFlow.js';
import { isValidOtpShape, maskMobile, MAX_OTP_ATTEMPTS, nextAttemptState } from '../src/features/auth/domain/otpRules.js';
import {
  clearDemoSession, demoCredentials, demoOtp, demoSessionKey, matchesDemoOtp, readDemoSession,
  resendOtp, saveDemoSession, verifyCredentials, verifyOtp,
} from '../src/features/auth/services/demoAuthService.js';

const challenge = { id: 'demo-test-challenge', maskedMobile: '+91 90•••••000' };

function startChallenge(remember = false) {
  const checking = authFlow(createAuthState(), { type: 'check-credentials', remember });
  return authFlow(checking, { type: 'credentials-accepted', challenge });
}

test('OTP flow accepts credentials, verifies a challenge, and enters the workspace in order', () => {
  const idle = createAuthState();
  assert.equal(authFlow(idle, { type: 'otp-accepted' }), idle);

  const checking = authFlow(idle, { type: 'check-credentials', remember: true });
  assert.equal(checking.phase, 'checking');
  assert.equal(authFlow(checking, { type: 'credentials-rejected' }).phase, 'invalid');
  const otp = authFlow(checking, { type: 'credentials-accepted', challenge });
  assert.deepEqual(otp, { ...idle, phase: 'otp', challenge, remember: true });
  assert.equal(authFlow(otp, { type: 'enter' }), otp);
  const verifying = authFlow(otp, { type: 'check-otp' });
  assert.equal(verifying.phase, 'verifying');
  assert.equal(authFlow(verifying, { type: 'check-otp' }), verifying);
  const success = authFlow(verifying, { type: 'otp-accepted' });
  assert.deepEqual(success, { ...idle, phase: 'success', remember: true });
  const leaving = authFlow(success, { type: 'leave' });
  assert.deepEqual(leaving, { ...idle, phase: 'leaving', justSignedIn: true });
  const entered = authFlow(leaving, { type: 'enter' });
  assert.deepEqual(entered, { ...idle, phase: 'entered', justSignedIn: true });
  assert.deepEqual(authFlow(entered, { type: 'sign-out' }), { ...idle, phase: 'signed-out' });
  assert.deepEqual(authFlow(entered, { type: 'session-cleared' }), { ...idle, phase: 'signed-out' });
  assert.deepEqual(createAuthState(true), { ...idle, phase: 'entered' });
});

test('invalid OTP shape does not consume an attempt and five wrong codes clear the challenge', () => {
  let state = authFlow(startChallenge(true), { type: 'otp-shape-error' });
  assert.equal(state.phase, 'otp-invalid');
  assert.equal(state.attempts, 0);

  for (let attempt = 1; attempt <= MAX_OTP_ATTEMPTS; attempt += 1) {
    state = authFlow(state, { type: 'check-otp' });
    state = authFlow(state, { type: 'otp-rejected' });
    if (attempt < MAX_OTP_ATTEMPTS) {
      assert.equal(state.phase, 'otp-invalid');
      assert.equal(state.attempts, attempt);
      assert.equal(state.challenge, challenge);
      assert.match(state.error, /Incorrect demo code/);
    }
  }

  assert.deepEqual(state, {
    ...createAuthState(),
    error: 'Too many incorrect codes. Sign in again to start a new verification.',
  });
  assert.deepEqual(authFlow(state, { type: 'clear-login-error' }), createAuthState());
});

test('OTP helpers enforce shape, mask the mobile and cap wrong attempts', () => {
  assert.equal(isValidOtpShape(demoOtp), true);
  for (const value of ['12345', '1234567', ' 123456', '123456\n', '１２３４５６', '12a456', 123456]) {
    assert.equal(isValidOtpShape(value), false);
  }
  assert.equal(maskMobile(' 9000000000 '), '+91 90•••••000');
  assert.equal(maskMobile('invalid'), '');
  assert.deepEqual(nextAttemptState(3), { attempts: 4, locked: false });
  assert.deepEqual(nextAttemptState(4), { attempts: 5, locked: true });
  assert.deepEqual(nextAttemptState(5), { attempts: 5, locked: true });
  assert.equal(matchesDemoOtp(demoOtp), true);
  assert.equal(matchesDemoOtp('000000'), false);
});

test('demo service writes no session during credentials, resend or rejected OTP', async t => {
  function createStorage() {
    const values = new Map();
    return {
      getItem: key => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
      removeItem: key => values.delete(key),
    };
  }

  const previous = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const localStorage = createStorage();
  const sessionStorage = createStorage();
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { localStorage, sessionStorage } });
  t.after(() => {
    if (previous) Object.defineProperty(globalThis, 'window', previous);
    else delete globalThis.window;
  });

  localStorage.setItem(demoSessionKey, 'signed-in');
  assert.equal(readDemoSession(), false);
  localStorage.removeItem(demoSessionKey);

  const [{ challenge: result }] = await Promise.all([
    verifyCredentials(demoCredentials),
    assert.rejects(verifyCredentials({ ...demoCredentials, password: 'wrong' }), { code: 'invalid-credentials' }),
  ]);
  assert.deepEqual(result, { id: 'nyro-demo-otp', maskedMobile: '+91 90•••••000' });

  function assertNoSession() {
    assert.equal(localStorage.getItem(demoSessionKey), null);
    assert.equal(sessionStorage.getItem(demoSessionKey), null);
    assert.equal(readDemoSession(), false);
  }

  assertNoSession();
  const [resend] = await Promise.all([
    resendOtp({ challengeId: result.id }),
    assert.rejects(verifyOtp({ challengeId: result.id, code: '000000' }), { code: 'invalid-otp' }),
    assert.rejects(verifyOtp({ challengeId: 'expired', code: demoOtp }), { code: 'invalid-challenge' }),
  ]);
  assert.deepEqual(resend, { sent: true });
  assertNoSession();

  const verified = await verifyOtp({ challengeId: result.id, code: demoOtp });
  assert.deepEqual(verified, { verified: true });
  saveDemoSession(true);
  assert.equal(localStorage.getItem(demoSessionKey), 'otp-verified');
  assert.equal(sessionStorage.getItem(demoSessionKey), null);
  assert.equal(readDemoSession(), true);
  clearDemoSession();
  assertNoSession();
});

test('a canceled verification rejects without a delayed result', async () => {
  const controller = new AbortController();
  const request = verifyCredentials(demoCredentials, { signal: controller.signal });
  controller.abort();
  await assert.rejects(request, { name: 'AbortError' });
});
