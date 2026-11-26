import React, { useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { validateLogin } from '../domain/loginRules.js';
import { demoCredentials } from '../services/demoAuthService.js';

export function LoginForm({ phase, onSignIn, onClearError }) {
  const [fields, setFields] = useState({ mobile: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);
  const form = useRef(null);
  const busy = phase === 'checking';

  function updateField(field, value) {
    setFields(previous => ({ ...previous, [field]: value }));
    if (errors[field]) setErrors(previous => ({ ...previous, [field]: undefined }));
    if (field !== 'remember') onClearError();
  }

  function fillDemo() {
    setFields(previous => ({ ...previous, ...demoCredentials }));
    setVisiblePassword(false);
    setErrors({});
    onClearError();
  }

  function submit(event) {
    event.preventDefault();
    if (busy) return;
    const nextErrors = validateLogin(fields);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      form.current.elements.namedItem(firstInvalid).focus();
      return;
    }
    onSignIn(fields);
  }

  return (
    <form ref={form} onSubmit={submit} autoComplete="off" noValidate>
      <div className="mb-4">
        <label className="form-label" htmlFor="auth-mobile">Mobile number</label>
        <input id="auth-mobile" name="mobile" type="tel" inputMode="numeric" autoComplete="off" className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
          placeholder="Enter 10-digit number" value={fields.mobile} readOnly={busy} required
          aria-invalid={Boolean(errors.mobile)} aria-describedby={errors.mobile ? 'auth-mobile-error' : undefined}
          onChange={event => updateField('mobile', event.target.value)} />
        <div aria-live="polite" id="auth-mobile-error">{errors.mobile && <p className="auth-error">{errors.mobile}</p>}</div>
      </div>
      <div className="mb-4">
        <label className="form-label" htmlFor="auth-password">Password</label>
        <div className="password-wrapper">
          <input id="auth-password" name="password" type={visiblePassword ? 'text' : 'password'} autoComplete="off" className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="********" value={fields.password} readOnly={busy} required
            aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'auth-password-error' : undefined}
            onChange={event => updateField('password', event.target.value)} />
          <button type="button" className="toggle-password" aria-controls="auth-password" aria-pressed={visiblePassword}
            aria-label={visiblePassword ? 'Hide password' : 'Show password'} onClick={() => setVisiblePassword(v => !v)}>
            {visiblePassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div aria-live="polite" id="auth-password-error">{errors.password && <p className="auth-error">{errors.password}</p>}</div>
      </div>
      <div className="d-flex justify-content-between mb-4">
        <div className="form-check mb-0">
          <input className="form-check-input" type="checkbox" id="rememberMe" checked={fields.remember} disabled={busy}
            onChange={event => updateField('remember', event.target.checked)} />
          <label className="form-check-label" htmlFor="rememberMe">Keep me signed in</label>
        </div>
        <span className="text-muted text-xs align-self-center">Password reset unavailable</span>
      </div>
      <button type="submit" className="btn btn-primary w-100 mb-3" disabled={busy}>
        {busy ? <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />Signing in…</> : 'Login'}
      </button>
      <div role="status" className="auth-live-status">
        {busy && <span className="visually-hidden">Checking demo credentials.</span>}
        {phase === 'invalid' && <p className="auth-error text-center">Incorrect demo credentials. Try again or use the demo details below.</p>}
      </div>
      <p className="mb-4 text-center text-muted">Don’t have an account? <span className="auth-inert-link">Sign Up here</span></p>
      <div className="border-bottom position-relative my-4 text-center">
        <span className="px-3 position-absolute translate-middle top-50 start-50 bg-body text-muted text-nowrap">Or Continue With</span>
      </div>
      <button type="button" className="btn btn-light w-100 mb-3" disabled title="Not available in demo mode">Login with Google</button>
      <div className="auth-demo">
        <div><div className="fw-semibold text-body-emphasis">Demo access</div><div className="text-xs">Use fictional credentials only.</div></div>
        <button type="button" className="btn btn-soft btn-sm" onClick={fillDemo} disabled={busy}>Use demo details</button>
      </div>
    </form>
  );
}
