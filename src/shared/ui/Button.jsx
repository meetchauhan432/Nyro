import React from 'react';
import { Icon } from './Icon.jsx';

export function Button({ label, onClick, className = 'btn', iconName, ...props }) {
  return (
    <button type="button" className={className} onClick={onClick} {...props}>
      {iconName && <Icon name={iconName} size={18} />}
      {label}
    </button>
  );
}

export function IconButton({ name, label, onClick, className = 'icon-btn', ...props }) {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label={label}
      title={label}
      {...props}
    >
      <Icon name={name} size={19} />
    </button>
  );
}
