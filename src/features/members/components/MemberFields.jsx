import React from 'react';
import { Field } from '@shared/ui/Field.jsx';

export function MemberField({ draft, field, label, onChange, placeholder, type = 'text' }) {
  return <Field
    label={label}
    value={draft[field] || ''}
    onChange={value => onChange(field, value)}
    placeholder={placeholder}
    type={type}
  />;
}

export function MemberSelect({ draft, field, label, options, onChange }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <select value={draft[field] || ''} onChange={event => onChange(field, event.target.value)}>
        {options.map(([value, name]) => <option key={value} value={value}>{name}</option>)}
      </select>
    </label>
  );
}
