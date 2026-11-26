import { maskMobile } from '../domain/otpRules.js';

export const demoCredentials = Object.freeze({
  mobile: '9000000000',
  password: 'NyroDemo!',
});

export const demoOtp = '123456';
export const demoSessionKey = 'nyro.demo-auth';
const sessionValue = 'otp-verified';
const demoChallengeId = 'nyro-demo-otp';

export function matchesDemoCredentials({ mobile, password }) {
  return mobile.trim() === demoCredentials.mobile && password === demoCredentials.password;
}

export function matchesDemoOtp(code) {
  return code === demoOtp;
}

export function verifyCredentials({ mobile, password }, { signal } = {}) {
  if (!matchesDemoCredentials({ mobile, password })) {
    return respond(480, { error: demoError('invalid-credentials', 'Incorrect demo credentials.') }, signal);
  }
  return respond(480, { result: { challenge: { id: demoChallengeId, maskedMobile: maskMobile(mobile) } } }, signal);
}

export function verifyOtp({ challengeId, code }, { signal } = {}) {
  if (challengeId !== demoChallengeId) {
    return respond(800, { error: demoError('invalid-challenge', 'Verification session unavailable.') }, signal);
  }
  if (!matchesDemoOtp(code)) {
    return respond(800, { error: demoError('invalid-otp', 'Incorrect demo code.') }, signal);
  }
  return respond(800, { result: { verified: true } }, signal);
}

export function resendOtp({ challengeId }, { signal } = {}) {
  if (challengeId !== demoChallengeId) {
    return respond(500, { error: demoError('invalid-challenge', 'Verification session unavailable.') }, signal);
  }
  return respond(500, { result: { sent: true } }, signal);
}

function demoError(code, message) {
  return Object.assign(new Error(message), { code });
}

function respond(delay, { result, error }, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }

    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', cancel);
      if (error) reject(error);
      else resolve(result);
    }, delay);

    function cancel() {
      clearTimeout(timer);
      reject(signal.reason);
    }

    signal?.addEventListener('abort', cancel, { once: true });
  });
}

export function readDemoSession() {
  return [true, false].some(remember => {
    try {
      return browserStorage(remember).getItem(demoSessionKey) === sessionValue;
    } catch {
      return false;
    }
  });
}

export function saveDemoSession(remember) {
  clearDemoSession();
  try {
    browserStorage(remember).setItem(demoSessionKey, sessionValue);
  } catch {
    // Authentication still works for the current page when storage is blocked.
  }
}

export function clearDemoSession() {
  for (const remember of [true, false]) {
    try {
      browserStorage(remember).removeItem(demoSessionKey);
    } catch {
      // Either storage area can be unavailable independently.
    }
  }
}

function browserStorage(remember) {
  return remember ? window.localStorage : window.sessionStorage;
}