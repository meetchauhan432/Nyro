import React, { useLayoutEffect, useRef } from 'react';
import { LoginForm } from '../components/LoginForm.jsx';
import { LoginHero } from '../components/LoginHero.jsx';
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
      <div className="auth-layout">
        <div className="auth-hero-column" inert={showOtp ? '' : undefined} aria-hidden={showOtp || undefined}>
          <LoginHero dialogOpen={showOtp} />
        </div>
        <div className="auth-form-column">
          <section className={showOtp ? 'auth-panel is-behind' : 'auth-panel'} ref={card} aria-labelledby="auth-heading"
            inert={showOtp ? '' : undefined} aria-hidden={showOtp || undefined}>
            <div className="auth-brand text-center"><img className="auth-logo" src={`${import.meta.env.BASE_URL}nyro-login-logo.png`} alt="NYRO Technologies" /></div>
            <div className="auth-intro text-center">
              <h2 id="auth-heading" ref={heading} tabIndex={-1} className="mb-1">Welcome to NYRO</h2>
              <p className="mb-0">Sign in to your NYRO workspace.</p>
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
