import React, { useEffect, useRef, useState } from 'react';
import { Bell, LogOut, Menu, Search } from 'lucide-react';
import { Avatar } from '../ui/Avatar.jsx';

const notifications = [
  { title: 'Emma Smith', text: 'Commented on your deal', time: '2m ago' },
  { title: 'Design Team', text: 'Shared a new file', time: '1h ago' },
  { title: 'Security Update', text: 'Your password policy changed', time: '3h ago' },
  { title: 'Invoice #1432', text: 'Payment received', time: 'Yesterday' },
];

function usePopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const away = event => { if (!ref.current?.contains(event.target)) setOpen(false); };
    const esc = event => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', away);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', away); document.removeEventListener('keydown', esc); };
  }, [open]);
  return { open, setOpen, ref };
}

export function Header({ onMenu, onSignOut }) {
  const bell = usePopover();
  const user = usePopover();
  return (
    <header className="app-header">
      <button type="button" className="icon-btn d-lg-none" aria-label="Open menu" onClick={onMenu}><Menu size={20} /></button>
      <div className="search d-none d-sm-block">
        <Search size={16} />
        <input className="form-control" type="search" placeholder="Search…" aria-label="Search" />
      </div>
      <div className="ms-auto d-flex align-items-center gap-2">
        <div className="position-relative" ref={bell.ref}>
          <button type="button" className="icon-btn" aria-label="Notifications" aria-expanded={bell.open} onClick={() => bell.setOpen(v => !v)}>
            <Bell size={19} /><span className="position-absolute bg-danger rounded-circle" style={{ width: 8, height: 8, top: 9, right: 10 }} />
          </button>
          {bell.open && (
            <div className="menu-pop" style={{ minWidth: 300 }}>
              <div className="fw-semibold px-2 py-1">Notifications</div>
              {notifications.map(n => (
                <div className="item" key={n.title}>
                  <Avatar name={n.title} size={34} />
                  <div className="flex-grow-1"><div className="fw-medium text-body-emphasis">{n.title}</div><div className="text-xs">{n.text}</div></div>
                  <span className="text-xs">{n.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="position-relative" ref={user.ref}>
          <button type="button" className="d-flex align-items-center gap-2 border-0 bg-transparent p-1" aria-expanded={user.open} onClick={() => user.setOpen(v => !v)}>
            <Avatar name="NYRO Admin" size={38} />
            <span className="d-none d-md-block text-start lh-sm"><span className="d-block fw-semibold text-body-emphasis">NYRO Admin</span><span className="text-xs">Administrator</span></span>
          </button>
          {user.open && (
            <div className="menu-pop">
              <button type="button" onClick={onSignOut}><LogOut size={16} />Sign out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
