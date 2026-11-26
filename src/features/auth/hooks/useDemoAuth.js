import { useEffect, useReducer, useRef } from 'react';
import { authFlow, createAuthState, isOtpEntry } from '../domain/authFlow.js';
import { isValidOtpShape } from '../domain/otpRules.js';
import {
  clearDemoSession, demoSessionKey, readDemoSession, resendOtp, saveDemoSession, verifyCredentials, verifyOtp,
} from '../services/demoAuthService.js';

export function useDemoAuth() {
  const [state, dispatch] = useReducer(authFlow, undefined, () => createAuthState(readDemoSession()));
  const pending = useRef(null);

  useEffect(() => {
    function handleStorage(event) {
      if ((event.key === demoSessionKey || event.key === null) && !readDemoSession()) {
        dispatch({ type: 'session-cleared' });
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      pending.current?.abort();
      pending.current = null;
    };
  }, []);

  useEffect(() => {
    if (state.phase === 'success') {
      saveDemoSession(state.remember);
      const hold = window.setTimeout(() => dispatch({ type: 'leave' }), 700);
      return () => window.clearTimeout(hold);
    }
    if (state.phase === 'leaving') {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const fallback = window.setTimeout(() => dispatch({ type: 'enter' }), reduced ? 280 : 700);
      return () => window.clearTimeout(fallback);
    }
  }, [state.phase, state.remember]);

  async function completeRequest(request, controller, accepted, rejected) {
    try {
      const result = await request;
      if (!controller.signal.aborted) dispatch(accepted(result));
    } catch (error) {
      if (!controller.signal.aborted) dispatch(rejected(error));
    } finally {
      if (pending.current === controller) pending.current = null;
    }
  }

  function signIn(credentials) {
    if (pending.current || !['idle', 'invalid', 'signed-out'].includes(state.phase)) return;
    const controller = new AbortController();
    pending.current = controller;
    dispatch({ type: 'check-credentials', remember: credentials.remember });
    void completeRequest(
      verifyCredentials(credentials, { signal: controller.signal }),
      controller,
      ({ challenge }) => ({ type: 'credentials-accepted', challenge }),
      () => ({ type: 'credentials-rejected' }),
    );
  }

  function submitOtp(code) {
    if (pending.current || !isOtpEntry(state.phase)) return;
    if (!isValidOtpShape(code)) {
      dispatch({ type: 'otp-shape-error' });
      return;
    }
    const controller = new AbortController();
    pending.current = controller;
    dispatch({ type: 'check-otp' });
    void completeRequest(
      verifyOtp({ challengeId: state.challenge.id, code }, { signal: controller.signal }),
      controller,
      ({ verified }) => ({ type: verified ? 'otp-accepted' : 'otp-unavailable' }),
      error => ({ type: error.code === 'invalid-otp' ? 'otp-rejected' : 'otp-unavailable' }),
    );
  }

  async function resendCode() {
    if (pending.current || !isOtpEntry(state.phase)) return false;
    const controller = new AbortController();
    pending.current = controller;
    try {
      const { sent } = await resendOtp({ challengeId: state.challenge.id }, { signal: controller.signal });
      if (!sent || controller.signal.aborted) return false;
      dispatch({ type: 'otp-resent' });
      return true;
    } catch {
      return false;
    } finally {
      if (pending.current === controller) pending.current = null;
    }
  }

  function cancelOtp() {
    if (!state.challenge) return;
    pending.current?.abort();
    pending.current = null;
    dispatch({ type: 'cancel-otp' });
  }

  function signOut() {
    pending.current?.abort();
    pending.current = null;
    clearDemoSession();
    dispatch({ type: 'sign-out' });
  }

  return {
    state, signIn, submitOtp, resendCode, cancelOtp, signOut,
    clearError: () => dispatch({ type: 'clear-login-error' }),
    finishEntry: () => dispatch({ type: 'enter' }),
  };
}
