import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useFocusTrap } from '../../auth/hooks/useFocusTrap.js';
export function Drawer({ title, children, onClose, wide = false }) { const ref = useRef(null); useFocusTrap(ref, onClose); useEffect(() => { const prev = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = prev; }; }, []); return createPortal(<div className="ops-overlay" onMouseDown={e => { if (e.target === e.currentTarget)
    onClose(); }}><section ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} className={`ops-drawer ${wide ? 'wide' : ''}`}><header><div><small>NYRO WORKSPACE · DEMO</small><h5>{title}</h5></div><button className="icon-btn" aria-label="Close panel" onClick={onClose}><X size={22}/></button></header><div className="ops-drawer-body">{children}</div></section></div>, document.body); }
