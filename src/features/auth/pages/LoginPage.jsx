import React, { useLayoutEffect, useRef } from 'react';
import { LoginForm } from '../components/LoginForm.jsx';
import { OtpModal } from '../components/OtpModal.jsx';

export function LoginPage({ logo, phase, challenge, error, onSignIn, onClearError, onSubmitOtp, onResendOtp, onCancelOtp, onEntered }) {
  const card = useRef(null);
  const heading = useRef(null);
  const hadOtp = useRef(false);
  const returnedToLogin = useRef(phase === 'signed-out');
  const leaving = phase === 'leaving';
  const showOtp = Boolean(challenge) || phase === 'success' || leaving;
  const returnedAfterAttemptLimit = phase === 'idle' && Boolean(error);

  useLayoutEffect(() => {
    if (returnedToLogin.current || returnedAfterAttemptLimit) {
      heading.current?.focus({ preventScroll: true });
    } else if (hadOtp.current && !showOtp) {
      card.current?.querySelector('button[type="submit"]')?.focus();
    }
    hadOtp.current = showOtp;
    returnedToLogin.current = false;
  }, [showOtp, returnedAfterAttemptLimit]);

  return (
    <main className={leaving ? 'auth-frame-wrapper is-leaving' : 'auth-frame-wrapper'}
      onAnimationEnd={event => { if (leaving && event.target === event.currentTarget) onEntered(); }}>
      <div className="row g-0 h-100">
        <div className="col-xl-8 col-lg-7 d-none d-lg-block">
          <div className="auth-frame" aria-hidden="true">
            <div className="auth-frame-copy">
              <h2>Run your whole workspace from one place.</h2>
              <p>Dashboards, finance and team performance — secured with one-time verification.</p>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-5 align-self-center">
          <section className={showOtp ? 'auth-panel is-behind' : 'auth-panel'} ref={card} aria-labelledby="auth-heading"
            inert={showOtp ? '' : undefined} aria-hidden={showOtp || undefined}>
            <div className="mb-4 text-center"><img className="auth-logo" src={logo} alt="NYRO Technologies" /></div>
            <div className="text-center mb-4">
              <h5 id="auth-heading" ref={heading} tabIndex={-1} className="mb-1">Welcome to NYRO</h5>
              <p className="mb-0">Sign in to access your secure admin dashboard.</p>
            </div>
            <div role="status">{returnedAfterAttemptLimit && <p className="auth-error text-center">{error}</p>}</div>
            {/* Remount the form to clear its credentials as soon as the OTP challenge opens. */}
            <LoginForm key={showOtp ? 'behind' : 'active'} phase={phase} onSignIn={onSignIn} onClearError={onClearError} />
          </section>
        </div>
      </div>
      {showOtp && (
        <OtpModal phase={phase} maskedMobile={challenge?.maskedMobile} error={error}
          onSubmit={onSubmitOtp} onResend={onResendOtp} onCancel={onCancelOtp} />
      )}
    </main>
  );
}
