import React, { useEffect, useRef, useState } from 'react';
import { EllipsisVertical } from 'lucide-react';

export function CardMenu() {
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = event => { if (!box.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);
  return (
    <div className="position-relative" ref={box}>
      <button type="button" className="icon-btn" aria-label="Card options" aria-expanded={open} onClick={() => setOpen(v => !v)}>
        <EllipsisVertical size={18} />
      </button>
      {open && (
        <div className="menu-pop" style={{ minWidth: 130 }}>
          <button type="button" onClick={() => setOpen(false)}>Edit</button>
          <button type="button" className="text-danger" onClick={() => setOpen(false)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export function Card({ title, actions, menu = true, children, bodyClass = '', className = '' }) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="card-header d-flex justify-content-between align-items-center">
          <h6 className="card-title">{title}</h6>
          <div className="d-flex align-items-center gap-2">{actions}{menu && <CardMenu />}</div>
        </div>
      )}
      <div className={`card-body ${bodyClass}`}>{children}</div>
    </div>
  );
}

export function Tabs({ options, value, onChange }) {
  return (
    <div className="btn-group btn-group-sm" role="group">
      {options.map(option => (
        <button key={option} type="button" className={`btn ${value === option ? 'btn-primary' : 'btn-light'}`} onClick={() => onChange(option)}>{option}</button>
      ))}
    </div>
  );
}

export function Trend({ value }) {
  const up = !String(value).startsWith('-');
  return <span className={`badge-soft ${up ? 'bg-success-subtle text-success-emphasis' : 'bg-danger-subtle text-danger-emphasis'}`}>{value}</span>;
}
