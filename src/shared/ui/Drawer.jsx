import React from 'react';
import { IconButton } from './Button.jsx';
export function Drawer({ title, subtitle, onClose, children, kind = 'drawer', busy = false }) {
  return <div className="overlay" onClick={e => {
    if (e.target === e.currentTarget && !busy)
      onClose();
  }}>
    <section className={kind} role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabIndex={-1}>
      <div className="drawer-header">
        <div>
          <h2 id="dialog-title">{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <IconButton
          name="close"
          label="Close dialog"
          onClick={onClose}
          className="icon-btn"
          {...{ disabled: busy }}
        />
      </div>
      <div className="drawer-body">{children}</div>
    </section>
  </div>;
}
