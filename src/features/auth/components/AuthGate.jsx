import React from 'react';
import { useDemoAuth } from '../hooks/useDemoAuth.js';
import { LoginPage } from '../pages/LoginPage.jsx';

export function AuthGate({ logo, children }) {
  const { state, signIn, submitOtp, resendCode, cancelOtp, signOut, clearError, finishEntry } = useDemoAuth();
  const { phase, justSignedIn, challenge, error } = state;
  const isEntering = phase === 'leaving';
  const showWorkspace = isEntering || phase === 'entered';

  return (
    <>
      {showWorkspace && (
        <React.Fragment key="workspace">
          {children({ signOut, isEntering, justSignedIn: justSignedIn && phase === 'entered' })}
        </React.Fragment>
      )}
      {phase !== 'entered' && (
        <LoginPage key="login" logo={logo} phase={phase} challenge={challenge} error={error}
          onSignIn={signIn} onClearError={clearError} onSubmitOtp={submitOtp}
          onResendOtp={resendCode} onCancelOtp={cancelOtp} onEntered={finishEntry} />
      )}
    </>
  );
}
