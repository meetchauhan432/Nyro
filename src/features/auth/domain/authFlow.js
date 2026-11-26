import { nextAttemptState } from './otpRules.js';

export function createAuthState(signedIn = false) {
  return {
    phase: signedIn ? 'entered' : 'idle',
    justSignedIn: false,
    remember: false,
    challenge: null,
    attempts: 0,
    error: '',
  };
}

export function isOtpEntry(phase) {
  return phase === 'otp' || phase === 'otp-invalid';
}

export function authFlow(state, action) {
  switch (action.type) {
    case 'check-credentials':
      if (!['idle', 'invalid', 'signed-out'].includes(state.phase)) return state;
      return { ...createAuthState(), phase: 'checking', remember: action.remember };
    case 'credentials-accepted':
      if (state.phase !== 'checking') return state;
      return { ...state, phase: 'otp', challenge: action.challenge };
    case 'credentials-rejected':
      if (state.phase !== 'checking') return state;
      return { ...createAuthState(), phase: 'invalid' };
    case 'clear-login-error':
      if (state.phase === 'invalid' || (state.phase === 'idle' && state.error)) return createAuthState();
      return state;
    case 'otp-shape-error':
      if (!isOtpEntry(state.phase)) return state;
      return { ...state, phase: 'otp-invalid', error: 'Enter exactly six digits.' };
    case 'check-otp':
      if (!isOtpEntry(state.phase)) return state;
      return { ...state, phase: 'verifying', error: '' };
    case 'otp-rejected': {
      if (state.phase !== 'verifying') return state;
      const { attempts, locked } = nextAttemptState(state.attempts);
      if (locked) return { ...createAuthState(), error: 'Too many incorrect codes. Sign in again to start a new verification.' };
      return { ...state, phase: 'otp-invalid', attempts, error: 'Incorrect demo code. Try again.' };
    }
    case 'otp-unavailable':
      if (state.phase !== 'verifying') return state;
      return { ...state, phase: 'otp-invalid', error: 'The code could not be verified. Try again.' };
    case 'otp-resent':
      return isOtpEntry(state.phase) ? { ...state, phase: 'otp', error: '' } : state;
    case 'cancel-otp':
      return state.challenge ? createAuthState() : state;
    case 'otp-accepted':
      if (state.phase !== 'verifying') return state;
      return { ...createAuthState(), phase: 'success', remember: state.remember };
    case 'leave':
      if (state.phase !== 'success') return state;
      return { ...createAuthState(), phase: 'leaving', justSignedIn: true };
    case 'enter':
      if (state.phase !== 'leaving') return state;
      return { ...state, phase: 'entered' };
    case 'sign-out':
      return { ...createAuthState(), phase: 'signed-out' };
    case 'session-cleared':
      if (!['success', 'leaving', 'entered'].includes(state.phase)) return state;
      return { ...createAuthState(), phase: 'signed-out' };
    default:
      return state;
  }
}
