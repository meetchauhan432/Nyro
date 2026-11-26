import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { isOtpEntry } from '../domain/authFlow.js';
import { useFocusTrap } from '../hooks/useFocusTrap.js';
import { demoOtp } from '../services/demoAuthService.js';
import { OTP_LENGTH, OtpInput } from './OtpInput.jsx';

const resendSeconds = 30;
const emptyDigits = () => Array(OTP_LENGTH).fill('');

export function OtpModal({ phase, maskedMobile, error, onSubmit, onResend, onCancel }) {
  const overlay = useRef(null);
  const dialog = useRef(null);
  const inputRefs = useRef([]);
  const [digits, setDigits] = useState(emptyDigits);
  const [deadline, setDeadline] = useState(() => Date.now() + resendSeconds * 1000);
  const [remaining, setRemaining] = useState(resendSeconds);
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState('');
  const verified = phase === 'success' || phase === 'leaving';
  const invalid = phase === 'otp-invalid';
  const canSubmit = isOtpEntry(phase) && !resending;
  const complete = digits.every(Boolean);
  const status = phase === 'verifying' ? 'Verifying code…' : resending ? 'Resending demo code…' : resendStatus;

  useFocusTrap(dialog, verified ? undefined : onCancel);

  useLayoutEffect(() => {
    const viewport = window.visualViewport;
    const panel = overlay.current;
    if (!viewport || !panel) return;

    function fitVisualViewport() {
      if (viewport.scale !== 1) {
        panel.style.removeProperty('--auth-otp-viewport-top');
        panel.style.removeProperty('--auth-otp-viewport-height');
        return;
      }
      panel.style.setProperty('--auth-otp-viewport-top', `${viewport.offsetTop}px`);
      panel.style.setProperty('--auth-otp-viewport-height', `${viewport.height}px`);
    }

    fitVisualViewport();
    viewport.addEventListener('resize', fitVisualViewport);
    viewport.addEventListener('scroll', fitVisualViewport);
    return () => {
      viewport.removeEventListener('resize', fitVisualViewport);
      viewport.removeEventListener('scroll', fitVisualViewport);
    };
  }, []);

  useLayoutEffect(() => {
    if (verified) dialog.current?.focus({ preventScroll: true });
  }, [verified]);

  useLayoutEffect(() => {
    if (!invalid) return;
    setDigits(emptyDigits());
    setResendStatus('');
    inputRefs.current[0]?.focus();
  }, [invalid]);

  useEffect(() => {
    const tick = () => Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    const initialRemaining = tick();
    setRemaining(initialRemaining);
    if (!initialRemaining) return;
    const interval = window.setInterval(() => {
      const seconds = tick();
      setRemaining(seconds);
      if (seconds === 0) window.clearInterval(interval);
    }, 250);
    return () => window.clearInterval(interval);
  }, [deadline]);

  function updateDigits(next) {
    setDigits(next);
    if (canSubmit && next.every(Boolean)) onSubmit(next.join(''));
  }

  async function resend() {
    if (!canSubmit || Date.now() < deadline) return;
    setResending(true);
    setResendStatus('');
    const sent = await onResend();
    setResending(false);
    setResendStatus(sent ? 'Demo code resent.' : 'Could not resend the code. Try again.');
    if (sent) {
      setRemaining(resendSeconds);
      setDeadline(Date.now() + resendSeconds * 1000);
      setDigits(emptyDigits());
      inputRefs.current[0]?.focus();
    }
  }

  return (
    <div className="auth-otp-overlay" ref={overlay}>
      <section className={verified ? 'auth-otp-dialog is-verified' : 'auth-otp-dialog'}
        ref={dialog} role="dialog" aria-modal="true" tabIndex={-1}
        aria-labelledby="auth-otp-heading" aria-describedby="auth-otp-description">
        <header className="auth-otp-header">
          {verified ? (
            <svg className="auth-otp-success" viewBox="0 0 64 64" aria-hidden="true">
              <circle className="auth-otp-success-ring" cx="32" cy="32" r="27" pathLength="1" />
              <path className="auth-otp-success-check" d="m20 33 8 8 16-18" pathLength="1" />
            </svg>
          ) : (
            <span className="auth-otp-icon"><ShieldCheck size={24} /></span>
          )}
          <h2 id="auth-otp-heading">{verified ? 'Code verified' : 'Verify it’s you'}</h2>
          <p id="auth-otp-description" aria-live="polite">
            {verified ? 'Opening your workspace.' : `Code sent to ${maskedMobile}`}
          </p>
        </header>
        {!verified && (
          <>
            <form className="auth-otp-form" onSubmit={event => {
              event.preventDefault();
              if (canSubmit && complete) onSubmit(digits.join(''));
            }}>
              <OtpInput digits={digits} inputRefs={inputRefs} onChange={updateDigits} readOnly={!canSubmit} invalid={invalid} />
              <div className="auth-otp-status" id="auth-otp-status" role="status" aria-live="polite">
                {status || (error && <p className="auth-error">{error}</p>)}
              </div>
              <button className="btn btn-primary w-100" type="submit" disabled={!canSubmit || !complete}
                aria-busy={phase === 'verifying' || undefined}>{phase === 'verifying' ? 'Verifying…' : 'Verify'}</button>
            </form>
            <div className="auth-otp-actions">
              <button className="auth-otp-link" type="button" onClick={resend}
                disabled={!canSubmit || remaining > 0}>
                {resending ? 'Sending…' : remaining ? `Resend code in ${remaining}s` : 'Resend code'}
              </button>
              <button className="auth-otp-link" type="button" onClick={onCancel}>
                Back to sign in
              </button>
            </div>
            <div className="auth-otp-demo">
              <span className="auth-demo-label">Demo access</span>
              <span>Demo code: <strong>{demoOtp}</strong></span>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
