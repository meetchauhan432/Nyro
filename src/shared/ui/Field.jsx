import React from 'react';
export function Field({ label, value, onChange, placeholder, type = 'text', inputMode, autoComplete = 'off', error, autoFocus = false }) {
  return <label className="field">
    <span className="field-label">{label}</span>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      inputMode={inputMode}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      aria-invalid={!!error}
    />
    {error && <small className="field-error">{error}</small>}
  </label>;
}
