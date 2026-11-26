import React from 'react';

export const OTP_LENGTH = 6;

export function OtpInput({ digits, inputRefs, onChange, readOnly, invalid }) {
  function focus(index) {
    inputRefs.current[index]?.focus();
  }

  function writeDigits(index, text) {
    const value = text.replace(/\D/g, '').slice(0, OTP_LENGTH);
    const next = [...digits];

    if (!value) {
      next[index] = '';
      onChange(next);
      return;
    }

    const start = value.length === OTP_LENGTH ? 0 : index;
    [...value].slice(0, OTP_LENGTH - start).forEach((digit, offset) => {
      next[start + offset] = digit;
    });
    focus(Math.min(start + value.length, OTP_LENGTH - 1));
    onChange(next);
  }

  function onKeyDown(event, index) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const direction = event.key === 'ArrowLeft' ? -1 : 1;
      focus(Math.max(0, Math.min(OTP_LENGTH - 1, index + direction)));
    } else if (event.key === 'Backspace' && !readOnly && !digits[index] && index > 0) {
      event.preventDefault();
      const next = [...digits];
      next[index - 1] = '';
      onChange(next);
      focus(index - 1);
    }
  }

  return (
    <div className={invalid ? 'auth-otp-digits is-invalid' : 'auth-otp-digits'}
      role="group" aria-label="Verification code" aria-describedby="auth-otp-status">
      {digits.map((digit, index) => (
        <input key={index} ref={element => { inputRefs.current[index] = element; }}
          type="text" inputMode="numeric" autoComplete="one-time-code"
          aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`} aria-invalid={invalid || undefined}
          readOnly={readOnly} value={digit}
          onChange={event => writeDigits(index, event.target.value)}
          onFocus={event => event.target.select()}
          onKeyDown={event => onKeyDown(event, index)}
          onPaste={event => {
            event.preventDefault();
            if (!readOnly) writeDigits(index, event.clipboardData.getData('text'));
          }} />
      ))}
    </div>
  );
}
